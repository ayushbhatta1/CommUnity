// Maps State
const mapsState = {
    map: null,
    markers: [],
    userLocation: null,
    searchRadius: 5000, // 5km radius
    resourceTypes: {
        food: { icon: '🍽️', color: '#4CAF50' },
        housing: { icon: '🏠', color: '#2196F3' },
        healthcare: { icon: '🏥', color: '#F44336' },
        education: { icon: '📚', color: '#9C27B0' },
        employment: { icon: '💼', color: '#FF9800' }
    }
};

// Initialize Map Implementation
function initMapImplementation() {
    console.log('Initializing map implementation...');
    
    // Show loading state
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }
    
    console.log('Map container found, showing loading state...');
    mapContainer.innerHTML = '<div class="loading">Loading map...</div>';
    
    try {
        if (!google || !google.maps) {
            throw new Error('Google Maps API not loaded');
        }
        
        // Create map centered on a default location
        mapsState.map = new google.maps.Map(document.getElementById('map-container'), {
            center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
            zoom: 12,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
        
        console.log('Map created successfully');
        
        // Get user's location
        getUserLocation();
        
        // Setup search listener
        setupSearchListener();
    } catch (error) {
        console.error('Error creating map:', error);
        const errorMessage = error.message || 'Failed to load map. Please try refreshing the page.';
        showError(errorMessage);
        
        // Show error in map container
        mapContainer.innerHTML = `<div class="error-message">${errorMessage}</div>`;
    }
}

// Get User Location
function getUserLocation() {
    if (navigator.geolocation) {
        // Show loading state
        const mapContainer = document.getElementById('map-container');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.textContent = 'Getting your location...';
        mapContainer.appendChild(loadingDiv);
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Remove loading state
                const loadingDiv = mapContainer.querySelector('.loading');
                if (loadingDiv) loadingDiv.remove();
                
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                mapsState.userLocation = userLocation;
                mapsState.map.setCenter(userLocation);
                
                // Add user marker
                new google.maps.Marker({
                    position: userLocation,
                    map: mapsState.map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 2
                    },
                    title: 'Your Location'
                });
                
                // Show success message
                showSuccess('Location found! You can now search for nearby resources.');
            },
            (error) => {
                // Remove loading state
                const loadingDiv = mapContainer.querySelector('.loading');
                if (loadingDiv) loadingDiv.remove();
                
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

// Search Nearby Resources
async function searchNearbyResources(query) {
    if (!mapsState.userLocation) {
        throw new Error('User location not available');
    }
    
    // Clear existing markers
    clearMarkers();
    
    // Mock data for development
    const mockResources = [
        {
            id: '1',
            name: 'Community Food Bank',
            type: 'food',
            description: 'Provides free food and groceries to those in need',
            address: '123 Main St, New York, NY',
            phone: '(555) 123-4567',
            hours: 'Mon-Fri: 9am-5pm',
            location: {
                lat: mapsState.userLocation.lat + 0.01,
                lng: mapsState.userLocation.lng + 0.01
            }
        },
        {
            id: '2',
            name: 'Health Clinic',
            type: 'healthcare',
            description: 'Free medical services and health check-ups',
            address: '456 Oak Ave, New York, NY',
            phone: '(555) 234-5678',
            hours: 'Mon-Sat: 8am-6pm',
            location: {
                lat: mapsState.userLocation.lat - 0.01,
                lng: mapsState.userLocation.lng - 0.01
            }
        },
        {
            id: '3',
            name: 'Job Training Center',
            type: 'employment',
            description: 'Free job training and career counseling',
            address: '789 Pine St, New York, NY',
            phone: '(555) 345-6789',
            hours: 'Mon-Fri: 10am-4pm',
            location: {
                lat: mapsState.userLocation.lat + 0.02,
                lng: mapsState.userLocation.lng - 0.02
            }
        }
    ];
    
    // Filter mock data based on query
    const filteredResources = mockResources.filter(resource => 
        resource.name.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase())
    );
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return filteredResources;
}

// Display Resource Results
function displayResourceResults(resources) {
    resources.forEach(resource => {
        const marker = createResourceMarker(resource);
        mapsState.markers.push(marker);
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(resource)
        });
        
        // Add click listener to marker
        marker.addListener('click', () => {
            infoWindow.open(mapsState.map, marker);
        });
    });
    
    // Fit map to show all markers
    if (mapsState.markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        mapsState.markers.forEach(marker => bounds.extend(marker.getPosition()));
        mapsState.map.fitBounds(bounds);
    }
}

// Create Resource Marker
function createResourceMarker(resource) {
    const type = mapsState.resourceTypes[resource.type] || mapsState.resourceTypes.food;
    
    return new google.maps.Marker({
        position: {
            lat: resource.location.lat,
            lng: resource.location.lng
        },
        map: mapsState.map,
        title: resource.name,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: type.color,
            fillOpacity: 0.8,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
        }
    });
}

// Create Info Window Content
function createInfoWindowContent(resource) {
    const type = mapsState.resourceTypes[resource.type] || mapsState.resourceTypes.food;
    
    return `
        <div class="info-window">
            <h3>${type.icon} ${resource.name}</h3>
            <p>${resource.description}</p>
            <div class="info-details">
                <p>📍 ${resource.address}</p>
                <p>📞 ${resource.phone || 'No phone available'}</p>
                <p>⏰ ${resource.hours || 'Hours not available'}</p>
            </div>
            <div class="info-actions">
                <button onclick="getDirections('${resource.id}')">Get Directions</button>
                <button onclick="saveResource('${resource.id}')">Save</button>
            </div>
        </div>
    `;
}

// Clear Markers
function clearMarkers() {
    mapsState.markers.forEach(marker => marker.setMap(null));
    mapsState.markers = [];
}

// Get Directions
function getDirections(resourceId) {
    const resource = findResourceById(resourceId);
    if (!resource || !mapsState.userLocation) return;
    
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    
    directionsRenderer.setMap(mapsState.map);
    
    directionsService.route(
        {
            origin: mapsState.userLocation,
            destination: resource.location,
            travelMode: google.maps.TravelMode.TRANSIT
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                showError('Failed to get directions. Please try again.');
            }
        }
    );
}

// Save Resource
function saveResource(resourceId) {
    const savedResources = JSON.parse(localStorage.getItem('savedResources') || '[]');
    if (!savedResources.includes(resourceId)) {
        savedResources.push(resourceId);
        localStorage.setItem('savedResources', JSON.stringify(savedResources));
        showSuccess('Resource saved successfully!');
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showError(message) {
    // Implementation for error notification
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showSuccess(message) {
    // Implementation for success notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Export for use in other modules
window.maps = {
    initMapImplementation,
    searchNearbyResources,
    getDirections,
    saveResource
}; 