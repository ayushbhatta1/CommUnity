const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log environment variables on startup
console.log('\n=== Environment Variables ===');
console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY ? 'Set' : 'Not set');
if (process.env.GOOGLE_MAPS_API_KEY) {
    console.log('API Key length:', process.env.GOOGLE_MAPS_API_KEY.length);
    console.log('API Key starts with:', process.env.GOOGLE_MAPS_API_KEY.substring(0, 10) + '...');
}
console.log('========================\n');

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Special handler for resources page
app.get('/pages/resources.html', (req, res) => {
    console.log('\n=== Processing Resources Page ===');
    const filePath = path.join(__dirname, 'pages', 'resources.html');
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    console.log('API Key from env:', apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set');
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Log the exact script tag before replacement
        const scriptTagMatch = content.match(/<script[^>]*src="[^"]*GOOGLE_MAPS_API_KEY[^"]*"[^>]*>/);
        if (scriptTagMatch) {
            console.log('Found script tag:', scriptTagMatch[0]);
        } else {
            console.log('WARNING: Script tag with GOOGLE_MAPS_API_KEY not found in content');
        }
        
        // Replace the API key placeholder with the actual key
        content = content.replace(
            'GOOGLE_MAPS_API_KEY',
            apiKey || ''
        );
        
        // Log the exact script tag after replacement
        const scriptTagAfterMatch = content.match(/<script[^>]*src="[^"]*maps\.googleapis\.com[^"]*"[^>]*>/);
        if (scriptTagAfterMatch) {
            console.log('Script tag after replacement:', scriptTagAfterMatch[0]);
        } else {
            console.log('WARNING: Script tag not found after replacement');
        }
        
        console.log('========================\n');
        res.send(content);
    } else {
        console.log('ERROR: Resources page file not found at:', filePath);
        res.status(404).send('Resources page not found');
    }
});

// Handle other page routes
app.get('/pages/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'pages', page);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        
        // Replace the API key placeholder with the actual key
        content = content.replace(
            'GOOGLE_MAPS_API_KEY',
            apiKey || ''
        );
        res.send(content);
    } else {
        res.status(404).send('Page not found');
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files from root directory (moved after custom routes)
app.use(express.static(__dirname));

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Static file directories:');
    console.log('- Root:', __dirname);
}); 