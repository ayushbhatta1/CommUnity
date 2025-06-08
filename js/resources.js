// Sample resource data (in a real app, this would come from an API)
const resourceData = {
    foodBanks: [
        {
            name: "Community Food Bank",
            address: "123 Main St, City, State",
            phone: "(555) 123-4567",
            hours: "Mon-Fri: 9AM-5PM",
            services: ["Groceries", "Hot Meals", "Food Pantry"],
            distance: "0.5 miles"
        },
        {
            name: "Hope Food Pantry",
            address: "456 Oak Ave, City, State",
            phone: "(555) 234-5678",
            hours: "Mon-Sat: 8AM-6PM",
            services: ["Groceries", "Food Pantry"],
            distance: "1.2 miles"
        }
    ],
    housing: [
        {
            name: "Safe Haven Shelter",
            address: "789 Pine St, City, State",
            phone: "(555) 345-6789",
            hours: "24/7",
            services: ["Emergency Shelter", "Transitional Housing"],
            distance: "0.8 miles"
        },
        {
            name: "Community Housing Center",
            address: "321 Elm St, City, State",
            phone: "(555) 456-7890",
            hours: "Mon-Fri: 8AM-6PM",
            services: ["Affordable Housing", "Housing Assistance"],
            distance: "1.5 miles"
        }
    ],
    health: [
        {
            name: "Community Health Clinic",
            address: "654 Maple Dr, City, State",
            phone: "(555) 567-8901",
            hours: "Mon-Fri: 8AM-8PM",
            services: ["Primary Care", "Mental Health", "Preventive Care"],
            distance: "1.0 miles"
        },
        {
            name: "Wellness Center",
            address: "987 Cedar Ln, City, State",
            phone: "(555) 678-9012",
            hours: "Mon-Sat: 9AM-7PM",
            services: ["Basic Healthcare", "Dental Care"],
            distance: "1.8 miles"
        }
    ],
    training: [
        {
            name: "Skills Development Center",
            address: "147 Birch Rd, City, State",
            phone: "(555) 789-0123",
            hours: "Mon-Fri: 9AM-5PM",
            services: ["Job Training", "Skill Workshops"],
            distance: "1.3 miles"
        },
        {
            name: "Career Advancement Institute",
            address: "258 Spruce St, City, State",
            phone: "(555) 890-1234",
            hours: "Mon-Sat: 8AM-6PM",
            services: ["Vocational Training", "Certification Programs"],
            distance: "2.0 miles"
        }
    ]
};

// Function to create a resource item element
function createResourceItem(resource) {
    const item = document.createElement('div');
    item.className = 'resource-item';
    
    item.innerHTML = `
        <h4>${resource.name}</h4>
        <p>${resource.address}</p>
        <div class="details">
            <span>📞 ${resource.phone}</span>
            <span>⏰ ${resource.hours}</span>
            <span>📍 ${resource.distance}</span>
        </div>
        <div class="services">
            ${resource.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
        </div>
        <div class="actions">
            <button onclick="getDirections('${resource.address}')">Get Directions</button>
            <button class="secondary" onclick="saveResource('${resource.name}')">Save</button>
        </div>
    `;
    
    return item;
}

// Function to populate resource sections
function populateResources() {
    // Populate Food Banks
    const foodBankContainer = document.getElementById('food-bank-results');
    resourceData.foodBanks.forEach(resource => {
        foodBankContainer.appendChild(createResourceItem(resource));
    });

    // Populate Housing
    const housingContainer = document.getElementById('housing-results');
    resourceData.housing.forEach(resource => {
        housingContainer.appendChild(createResourceItem(resource));
    });

    // Populate Health Centers
    const healthContainer = document.getElementById('health-results');
    resourceData.health.forEach(resource => {
        healthContainer.appendChild(createResourceItem(resource));
    });

    // Populate Training Centers
    const trainingContainer = document.getElementById('training-results');
    resourceData.training.forEach(resource => {
        trainingContainer.appendChild(createResourceItem(resource));
    });
}

// Function to get directions (to be integrated with Google Maps)
function getDirections(address) {
    // This would be integrated with Google Maps API
    console.log('Getting directions to:', address);
    // For now, just open Google Maps in a new tab
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
}

// Function to save a resource (to be integrated with user profile)
function saveResource(resourceName) {
    console.log('Saving resource:', resourceName);
    // This would be integrated with the user's saved resources feature
    alert(`Saved ${resourceName} to your resources`);
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateResources();
    
    // Add event listener for search
    const searchInput = document.getElementById('resource-search');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        // Filter and update results based on search term
        // This would be implemented with actual search functionality
        console.log('Searching for:', searchTerm);
    });
}); 