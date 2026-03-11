// Maps State (exposed on window for resources.js)
const mapsState = window.mapsState = {
    map: null,
    markers: [],
    userLocation: null,
    searchRadius: 5000,
    resourceTypes: {
        food: { icon: '🍽️', color: '#4CAF50' },
        housing: { icon: '🏠', color: '#2196F3' },
        healthcare: { icon: '🏥', color: '#F44336' },
        education: { icon: '📚', color: '#9C27B0' },
        employment: { icon: '💼', color: '#FF9800' },
        clothing: { icon: '👕', color: '#795548' }
    }
};

// Create a colored circle icon for Leaflet markers
function createMarkerIcon(color) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
            width: 24px; height: 24px; border-radius: 50%;
            background: ${color}; border: 2px solid #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14]
    });
}

// Initialize Map Implementation
function initMapImplementation() {
    console.log('Initializing map implementation...');

    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }

    try {
        // Try to restore previous user location, otherwise default to NYC
        const savedLoc = JSON.parse(sessionStorage.getItem('userLocation') || 'null');
        const startLat = savedLoc ? savedLoc.lat : 40.7128;
        const startLng = savedLoc ? savedLoc.lng : -74.0060;
        const startZoom = savedLoc ? 14 : 4;

        mapsState.map = L.map('map-container').setView([startLat, startLng], startZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(mapsState.map);

        if (savedLoc) {
            mapsState.userLocation = savedLoc;
        }

        console.log('Map created successfully');
        getUserLocation();
        setupSearchListener();
        setupLocationSearch();
    } catch (error) {
        console.error('Error creating map:', error);
        const errorMessage = error.message || 'Failed to load map. Please try refreshing the page.';
        showError(errorMessage);
        mapContainer.innerHTML = `<div class="error-message">${escapeHTML(errorMessage)}</div>`;
    }
}

// Get User Location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setLocation(userLocation.lat, userLocation.lng, 'Your Location');
                showSuccess('Location found! Showing nearby resources.');
            },
            (error) => {
                console.error('Error getting location:', error);
                let errorMessage = 'Unable to get your location. ';

                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please enable location services in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred.';
                }

                showError(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Setup Search Listener
function setupSearchListener() {
    const searchInput = document.getElementById('resource-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) return;

        try {
            const results = await searchNearbyResources(query);
            displayResourceResults(results);
        } catch (error) {
            console.error('Error searching resources:', error);
            showError('Failed to search resources. Please try again.');
        }
    }, 300));
}

// Search Nearby Resources (uses API with real location)
async function searchNearbyResources(query) {
    if (!mapsState.userLocation) {
        throw new Error('User location not available');
    }

    clearMarkers();

    const params = new URLSearchParams({
        lat: mapsState.userLocation.lat,
        lng: mapsState.userLocation.lng,
        radius: mapsState.searchRadius
    });
    const response = await fetch(`/api/resources?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const allResources = await response.json();

    return allResources.filter(resource =>
        resource.name.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase())
    );
}

// Display Resource Results
function displayResourceResults(resources) {
    resources.forEach(resource => {
        const marker = createResourceMarker(resource);
        mapsState.markers.push(marker);
    });

    if (mapsState.markers.length > 0) {
        const group = L.featureGroup(mapsState.markers);
        mapsState.map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Create Resource Marker
function createResourceMarker(resource) {
    const type = mapsState.resourceTypes[resource.type] || mapsState.resourceTypes.food;

    const marker = L.marker(
        [resource.location.lat, resource.location.lng],
        { icon: createMarkerIcon(type.color) }
    ).addTo(mapsState.map);

    marker.bindPopup(createPopupContent(resource));
    return marker;
}

// Create Popup Content
function createPopupContent(resource) {
    const type = mapsState.resourceTypes[resource.type] || mapsState.resourceTypes.food;
    const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.location.lat},${resource.location.lng}`;

    return `
        <div class="info-window">
            <h3>${type.icon} ${escapeHTML(resource.name)}</h3>
            <p>${escapeHTML(resource.description)}</p>
            <div class="info-details">
                <p>&#128205; ${escapeHTML(resource.address)}</p>
                <p>&#128222; ${escapeHTML(resource.phone || 'No phone available')}</p>
                <p>&#9200; ${escapeHTML(resource.hours || 'Hours not available')}</p>
            </div>
            <div class="info-actions">
                <a href="${dirUrl}" target="_blank" rel="noopener" style="
                    display:inline-block; padding:6px 12px; background:#2563eb;
                    color:#fff; border-radius:4px; text-decoration:none; font-size:13px;
                ">Get Directions</a>
                <button onclick="mapsSaveResource('${escapeHTML(resource.id)}')">Save</button>
            </div>
        </div>
    `;
}

// Clear Markers
function clearMarkers() {
    mapsState.markers.forEach(marker => mapsState.map.removeLayer(marker));
    mapsState.markers = [];
}

// Get Directions (opens Google Maps directions in a new tab)
function mapsGetDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank', 'noopener');
}

// Save Resource
function mapsSaveResource(resourceId) {
    const savedResources = JSON.parse(localStorage.getItem('savedResources') || '[]');
    if (!savedResources.includes(resourceId)) {
        savedResources.push(resourceId);
        localStorage.setItem('savedResources', JSON.stringify(savedResources));
        showSuccess('Resource saved successfully!');
    }
}

// Set location from any source (geocode, GPS, manual)
function setLocation(lat, lng, label) {
    const loc = { lat, lng };
    mapsState.userLocation = loc;
    sessionStorage.setItem('userLocation', JSON.stringify(loc));
    mapsState.map.setView([lat, lng], 14);

    // Remove old location marker if any
    if (mapsState.locationMarker) {
        mapsState.map.removeLayer(mapsState.locationMarker);
    }
    mapsState.locationMarker = L.circleMarker([lat, lng], {
        radius: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        color: '#FFFFFF',
        weight: 2
    }).addTo(mapsState.map).bindPopup(label || 'Your Location');

    // Refresh resource listings
    if (typeof populateResources === 'function') populateResources();
}

// Geocode an address using Nominatim (free, no API key)
async function geocodeAddress(query) {
    const url = `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`;
    const response = await fetch(url, {
        headers: { 'Accept-Language': 'en' }
    });
    if (!response.ok) throw new Error('Geocoding failed');
    const results = await response.json();
    if (!results.length) throw new Error('Location not found');
    return results[0];
}

// Setup location search bar and "Use My Location" button
function setupLocationSearch() {
    const input = document.getElementById('location-search');
    const btn = document.getElementById('location-search-btn');
    const myLocBtn = document.getElementById('use-my-location');

    if (btn && input) {
        async function doLocationSearch() {
            const query = input.value.trim();
            if (!query) return;
            btn.disabled = true;
            btn.textContent = '...';
            try {
                const result = await geocodeAddress(query);
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                const label = result.display_name.split(',').slice(0, 2).join(',');
                setLocation(lat, lng, label);
                input.value = label;
                showSuccess(`Showing resources near ${label}`);
            } catch (err) {
                showError('Could not find that location. Try a city name or zip code.');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Go';
            }
        }

        btn.addEventListener('click', doLocationSearch);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doLocationSearch();
        });
    }

    if (myLocBtn) {
        myLocBtn.addEventListener('click', () => {
            myLocBtn.disabled = true;
            myLocBtn.textContent = 'Locating...';
            // Use geolocation directly with callbacks to reset button state
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const loc = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        setLocation(loc.lat, loc.lng, 'Your Location');
                        showSuccess('Location found! Showing nearby resources.');
                        myLocBtn.disabled = false;
                        myLocBtn.textContent = 'Use My Location';
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        showError('Unable to get your location. Please enable location services.');
                        myLocBtn.disabled = false;
                        myLocBtn.textContent = 'Use My Location';
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                showError('Geolocation is not supported by your browser.');
                myLocBtn.disabled = false;
                myLocBtn.textContent = 'Use My Location';
            }
        });
    }
}

// Export for use in other modules
window.maps = {
    initMapImplementation,
    searchNearbyResources,
    mapsGetDirections,
    mapsSaveResource,
    setLocation
};
