const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting CommUnity server...');

// Parse JSON request bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// --- Overpass API (OpenStreetMap) ---
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

// Map OSM tags to our resource types
function classifyOsmElement(tags) {
    if (tags.social_facility === 'food_bank' || tags['social_facility:for'] === 'food' ||
        tags.amenity === 'food_bank') return 'food';
    if (tags.social_facility === 'shelter' || tags.amenity === 'shelter' ||
        tags.social_facility === 'housing') return 'housing';
    if (tags.amenity === 'clinic' || tags.amenity === 'hospital' ||
        tags.healthcare === 'centre' || tags.healthcare === 'community_health_centre') return 'healthcare';
    if (tags.office === 'employment_agency' || tags.amenity === 'training') return 'employment';
    if (tags.shop === 'charity' || tags.shop === 'second_hand') return 'clothing';
    if (tags.amenity === 'social_facility') return 'food'; // generic fallback
    return null;
}

function osmToResource(element, userLat, userLng) {
    const tags = element.tags || {};
    const type = classifyOsmElement(tags);
    if (!type) return null;

    const lat = element.lat || (element.center && element.center.lat);
    const lng = element.lon || (element.center && element.center.lon);
    if (!lat || !lng) return null;

    // Calculate distance in miles
    const R = 3959;
    const dLat = (lat - userLat) * Math.PI / 180;
    const dLon = (lng - userLng) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(userLat*Math.PI/180) * Math.cos(lat*Math.PI/180) * Math.sin(dLon/2)**2;
    const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const parts = [tags['addr:housenumber'], tags['addr:street'], tags['addr:city'], tags['addr:state']].filter(Boolean);
    const address = parts.length ? parts.join(' ') : (tags.address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);

    return {
        id: String(element.id),
        name: tags.name || tags.operator || `${type.charAt(0).toUpperCase() + type.slice(1)} Resource`,
        type,
        description: tags.description || tags['service:description'] || tags.note || `Community ${type} resource`,
        address,
        phone: tags.phone || tags['contact:phone'] || 'Not available',
        hours: tags.opening_hours || 'Hours not available',
        services: buildServices(tags, type),
        distance: `${dist.toFixed(1)} miles`,
        location: { lat, lng }
    };
}

function buildServices(tags, type) {
    const services = [];
    if (tags.cuisine) services.push(...tags.cuisine.split(';').map(s => s.trim()));
    if (tags.healthcare) services.push(tags.healthcare);
    if (tags.social_facility) services.push(tags.social_facility.replace(/_/g, ' '));
    if (tags.shelter_type) services.push(tags.shelter_type.replace(/_/g, ' '));
    if (services.length === 0) {
        const defaults = {
            food: ['Food Assistance'], housing: ['Shelter'], healthcare: ['Health Services'],
            employment: ['Job Services'], clothing: ['Clothing']
        };
        services.push(...(defaults[type] || []));
    }
    return services.map(s => s.charAt(0).toUpperCase() + s.slice(1));
}

// Simple in-memory cache: key → { data, timestamp }
const overpassCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const CACHE_MAX_ENTRIES = 500;
const OVERPASS_TIMEOUT_MS = 30 * 1000;

async function queryOverpass(lat, lng, radiusMeters) {
    // Round coords to ~100m grid to increase cache hits
    const rLat = Math.round(lat * 100) / 100;
    const rLng = Math.round(lng * 100) / 100;
    const cacheKey = `${rLat},${rLng},${radiusMeters}`;

    const cached = overpassCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`Overpass cache hit for ${cacheKey}`);
        return cached.data;
    }

    const query = `
        [out:json][timeout:25];
        (
            node["social_facility"="food_bank"](around:${radiusMeters},${rLat},${rLng});
            node["social_facility:for"="food"](around:${radiusMeters},${rLat},${rLng});
            node["amenity"="social_facility"](around:${radiusMeters},${rLat},${rLng});
            node["amenity"="shelter"](around:${radiusMeters},${rLat},${rLng});
            node["social_facility"="shelter"](around:${radiusMeters},${rLat},${rLng});
            node["social_facility"="housing"](around:${radiusMeters},${rLat},${rLng});
            node["amenity"="clinic"](around:${radiusMeters},${rLat},${rLng});
            node["amenity"="hospital"](around:${radiusMeters},${rLat},${rLng});
            node["healthcare"="centre"](around:${radiusMeters},${rLat},${rLng});
            node["healthcare"="community_health_centre"](around:${radiusMeters},${rLat},${rLng});
            node["office"="employment_agency"](around:${radiusMeters},${rLat},${rLng});
            node["shop"="charity"](around:${radiusMeters},${rLat},${rLng});
            node["shop"="second_hand"](around:${radiusMeters},${rLat},${rLng});
            way["amenity"="hospital"](around:${radiusMeters},${rLat},${rLng});
            way["amenity"="clinic"](around:${radiusMeters},${rLat},${rLng});
        );
        out center body;
    `;

    const response = await fetch(OVERPASS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
        // Overpass can hang; give up before the browser does and fall back to mock data
        signal: AbortSignal.timeout(OVERPASS_TIMEOUT_MS)
    });

    if (!response.ok) throw new Error(`Overpass API error: ${response.status}`);
    const data = await response.json();
    const elements = data.elements || [];

    // Keep the cache bounded so a stream of different coordinates can't grow memory forever
    if (overpassCache.size >= CACHE_MAX_ENTRIES) {
        overpassCache.delete(overpassCache.keys().next().value);
    }
    overpassCache.set(cacheKey, { data: elements, timestamp: Date.now() });
    return elements;
}

// --- API Routes ---

// Search radius in metres: default 8 km, never below 500 m or above 32 km
function clampRadius(radius) {
    const r = Number(radius);
    if (!Number.isFinite(r) || r <= 0) return 8000;
    return Math.round(Math.min(Math.max(r, 500), 32000));
}

// Turn "$80,000 - $100,000" or "$25 per hour" into a yearly figure so the two can be compared
function annualSalary(salary) {
    const match = String(salary || '').replace(/,/g, '').match(/\d+(\.\d+)?/);
    if (!match) return 0;
    const value = parseFloat(match[0]);
    return /hour|hr/i.test(salary) ? value * 2080 : value;
}

const MAX_TEXT_LENGTH = 2000;
function tooLong(...values) {
    return values.some(v => typeof v !== 'string' || v.length > MAX_TEXT_LENGTH);
}
const mockData = require('./data/mockData');

// GET /api/resources
app.get('/api/resources', async (req, res) => {
    const { lat, lng, radius, type } = req.query;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    const hasLocation = lat !== undefined && lng !== undefined &&
        Number.isFinite(latNum) && Number.isFinite(lngNum) &&
        Math.abs(latNum) <= 90 && Math.abs(lngNum) <= 180;

    if ((lat !== undefined || lng !== undefined) && !hasLocation) {
        return res.status(400).json({ error: 'lat and lng must be valid coordinates' });
    }

    // If location provided, query Overpass for real data
    if (hasLocation) {
        try {
            const radiusMeters = clampRadius(radius);
            const elements = await queryOverpass(latNum, lngNum, radiusMeters);
            let results = elements.map(el => osmToResource(el, latNum, lngNum)).filter(Boolean);
            if (type) results = results.filter(r => r.type === type);
            results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
            console.log(`Overpass returned ${results.length} resources near ${lat},${lng}`);
            return res.json(results);
        } catch (err) {
            console.error('Overpass query failed, falling back to mock data:', err.message);
        }
    }

    // Fallback to mock data
    let results = [...mockData.resources];
    if (type) results = results.filter(r => r.type === type);
    res.json(results);
});

// GET /api/jobs
app.get('/api/jobs', (req, res) => {
    let results = [...mockData.jobs];
    if (req.query.type) {
        results = results.filter(j => j.type === req.query.type);
    }
    if (req.query.sort === 'recent') {
        results.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (req.query.sort === 'salary') {
        results.sort((a, b) => annualSalary(b.salary) - annualSalary(a.salary));
    }
    res.json(results);
});

// GET /api/posts
app.get('/api/posts', (req, res) => {
    res.json(mockData.posts);
});

// POST /api/posts
app.post('/api/posts', (req, res) => {
    const { author, content } = req.body;
    if (!author || !content) {
        return res.status(400).json({ error: 'author and content are required' });
    }
    if (tooLong(author, content)) {
        return res.status(400).json({ error: `author and content must be text under ${MAX_TEXT_LENGTH} characters` });
    }
    const newPost = {
        id: Date.now().toString(),
        author,
        content,
        date: new Date().toISOString(),
        likes: 0,
        comments: 0
    };
    mockData.posts.unshift(newPost);
    res.status(201).json(newPost);
});

// GET /api/messages
app.get('/api/messages', (req, res) => {
    res.json(mockData.messages);
});

// POST /api/messages
app.post('/api/messages', (req, res) => {
    const { userId, userName, content } = req.body;
    if (!userId || !userName || !content) {
        return res.status(400).json({ error: 'userId, userName, and content are required' });
    }
    if (tooLong(String(userId), userName, content)) {
        return res.status(400).json({ error: `userName and content must be text under ${MAX_TEXT_LENGTH} characters` });
    }
    const newMessage = {
        id: Date.now().toString(),
        userId,
        userName,
        content,
        timestamp: new Date().toISOString()
    };
    mockData.messages.push(newMessage);
    res.status(201).json(newMessage);
});

// GET /api/user/profile
app.get('/api/user/profile', (req, res) => {
    const user = mockData.users['1'];
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// PUT /api/user/profile
app.put('/api/user/profile', (req, res) => {
    const user = mockData.users['1'];
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const allowed = ['name', 'email', 'phone', 'language', 'notifications', 'visibility'];
    for (const key of allowed) {
        if (req.body[key] !== undefined) {
            user[key] = req.body[key];
        }
    }
    res.json(user);
});

// --- Page Routes ---

// Handle page routes
app.get('/pages/:page', (req, res) => {
    // Express decodes %2F in params, so "/pages/..%2Fserver.js" would otherwise escape the folder
    const pagesDir = path.join(__dirname, 'pages');
    const filePath = path.resolve(pagesDir, req.params.page);

    if (path.dirname(filePath) === pagesDir && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Page not found');
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static assets from specific directories only (prevents exposing server.js, package.json, etc.)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Serve specific root-level public files
app.get('/sw.js', (req, res) => res.sendFile(path.join(__dirname, 'sw.js')));
app.get('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, 'manifest.json')));

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server (skipped when required by tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = { app, annualSalary, clampRadius, classifyOsmElement, osmToResource };
