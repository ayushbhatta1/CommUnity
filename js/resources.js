// Resource finder functionality

const RESOURCES_PER_CATEGORY = 20; // Max items shown per category before "Show More"

// Build API URL with location if available
function resourceApiUrl(extra) {
    const params = new URLSearchParams(extra);
    // Use location from mapsState if available, or from stored coords
    const loc = (window.mapsState && window.mapsState.userLocation) ||
                JSON.parse(sessionStorage.getItem('userLocation') || 'null');
    if (loc) {
        params.set('lat', loc.lat);
        params.set('lng', loc.lng);
    }
    const distSelect = document.getElementById('distance');
    if (distSelect) {
        const miles = Number(distSelect.value) || 5;
        params.set('radius', Math.round(miles * 1609));
    }
    const typeSelect = document.getElementById('resource-type');
    if (typeSelect && typeSelect.value) {
        params.set('type', typeSelect.value);
    }
    return `/api/resources?${params}`;
}

// Show loading placeholders in all resource containers
function showLoadingState() {
    const groups = {
        food: document.getElementById('food-bank-results'),
        housing: document.getElementById('housing-results'),
        healthcare: document.getElementById('health-results'),
        employment: document.getElementById('training-results'),
        clothing: document.getElementById('clothing-results')
    };

    Object.values(groups).forEach(container => {
        if (container) {
            container.innerHTML = '<div class="loading-placeholder">Loading resources</div>';
        }
    });
}

// Populate resource sections from API
async function populateResources() {
    showLoadingState();

    try {
        const response = await fetch(resourceApiUrl());
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const resources = await response.json();

        const groups = {
            food: document.getElementById('food-bank-results'),
            housing: document.getElementById('housing-results'),
            healthcare: document.getElementById('health-results'),
            employment: document.getElementById('training-results'),
            clothing: document.getElementById('clothing-results')
        };

        // Clear existing content
        Object.values(groups).forEach(container => {
            if (container) container.innerHTML = '';
        });

        // Group resources by type
        const grouped = {};
        resources.forEach(resource => {
            if (!grouped[resource.type]) grouped[resource.type] = [];
            grouped[resource.type].push(resource);
        });

        // Render each group with pagination
        Object.entries(groups).forEach(([type, container]) => {
            if (!container) return;
            const items = grouped[type] || [];

            if (items.length === 0) {
                // Container stays empty, CSS :has(.resource-list:empty) hides the category
                return;
            }

            const visible = items.slice(0, RESOURCES_PER_CATEGORY);
            visible.forEach(resource => {
                container.appendChild(createResourceItem(resource));
            });

            // Show "Load More" button if there are more items
            if (items.length > RESOURCES_PER_CATEGORY) {
                const loadMoreBtn = document.createElement('button');
                loadMoreBtn.className = 'load-more-btn';
                loadMoreBtn.textContent = `Show ${items.length - RESOURCES_PER_CATEGORY} more`;
                loadMoreBtn.addEventListener('click', () => {
                    const remaining = items.slice(RESOURCES_PER_CATEGORY);
                    remaining.forEach(resource => {
                        container.insertBefore(createResourceItem(resource), loadMoreBtn);
                    });
                    loadMoreBtn.remove();
                });
                container.appendChild(loadMoreBtn);
            }
        });

        // Update the result count in the header
        const total = resources.length;
        const resultsHeader = document.querySelector('.results-section h2');
        if (resultsHeader) {
            resultsHeader.textContent = total > 0
                ? `Community Support Resources (${total} found)`
                : 'Community Support Resources';
        }

        // Announce results to screen readers
        const statusEl = document.getElementById('results-status');
        if (statusEl) {
            statusEl.textContent = total > 0
                ? `${total} resources found.`
                : 'No resources found. Try adjusting your search or filters.';
        }

    } catch (error) {
        console.error('Error loading resources:', error);
        showError('Failed to load resources. Please try again.');
    }
}

// Create a resource item element
function createResourceItem(resource) {
    const item = document.createElement('div');
    item.className = 'resource-item';

    const services = resource.services || [];
    const distanceText = resource.distance ? `&#128205; ${escapeHTML(resource.distance)}` : '';

    item.innerHTML = `
        <h4>${escapeHTML(resource.name)}</h4>
        <p>${escapeHTML(resource.address)}</p>
        <div class="details">
            <span>&#128222; ${escapeHTML(resource.phone)}</span>
            <span>&#9200; ${escapeHTML(resource.hours)}</span>
            ${distanceText ? `<span>${distanceText}</span>` : ''}
        </div>
        ${services.length > 0 ? `
        <div class="services">
            ${services.map(service => `<span class="service-tag">${escapeHTML(service)}</span>`).join('')}
        </div>` : ''}
        <div class="actions">
            <button onclick="openDirections('${escapeHTML(resource.address)}')">Get Directions</button>
            <button class="secondary" onclick="bookmarkResource('${escapeHTML(resource.name)}')">Save</button>
        </div>
    `;

    return item;
}

// Open directions in Google Maps
function openDirections(address) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
}

// Bookmark a resource
function bookmarkResource(resourceName) {
    const saved = JSON.parse(localStorage.getItem('savedResources') || '[]');
    if (!saved.includes(resourceName)) {
        saved.push(resourceName);
        localStorage.setItem('savedResources', JSON.stringify(saved));
        showSuccess(`Saved ${resourceName} to your resources`);
    } else {
        showSuccess(`${resourceName} is already saved`);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateResources();

    const searchInput = document.getElementById('resource-search');
    const searchBtn = document.querySelector('.search-section .search-btn');

    searchBtn?.addEventListener('click', async () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (!searchTerm) {
            populateResources();
            return;
        }

        showLoadingState();

        try {
            const response = await fetch(resourceApiUrl());
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const resources = await response.json();
            const filtered = resources.filter(r =>
                r.name.toLowerCase().includes(searchTerm) ||
                r.description.toLowerCase().includes(searchTerm) ||
                (r.services || []).some(s => s.toLowerCase().includes(searchTerm))
            );

            const groups = {
                food: document.getElementById('food-bank-results'),
                housing: document.getElementById('housing-results'),
                healthcare: document.getElementById('health-results'),
                employment: document.getElementById('training-results'),
                clothing: document.getElementById('clothing-results')
            };

            Object.values(groups).forEach(container => {
                if (container) container.innerHTML = '';
            });

            filtered.forEach(resource => {
                const container = groups[resource.type];
                if (container) {
                    container.appendChild(createResourceItem(resource));
                }
            });

            // Update count
            const resultsHeader = document.querySelector('.results-section h2');
            if (resultsHeader) {
                resultsHeader.textContent = `Community Support Resources (${filtered.length} found)`;
            }
        } catch (error) {
            console.error('Error searching resources:', error);
            showError('Failed to search resources. Please try again.');
        }
    });

    // Allow pressing Enter in search
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchBtn?.click();
        }
    });

    // Re-fetch when filters change
    const typeSelect = document.getElementById('resource-type');
    const distSelect = document.getElementById('distance');
    typeSelect?.addEventListener('change', () => populateResources());
    distSelect?.addEventListener('change', () => populateResources());
});
