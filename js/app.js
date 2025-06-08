// App State Management
const state = {
    currentPage: 'home',
    user: {
        name: 'John Doe',
        email: 'john.doe@example.com'
    },
    language: 'en'
};

// Mock Data
const mockData = {
    resources: [
        {
            id: '1',
            name: 'Community Food Bank',
            type: 'food',
            description: 'Provides free food and groceries to those in need',
            location: '123 Main St, New York, NY'
        },
        {
            id: '2',
            name: 'Health Clinic',
            type: 'healthcare',
            description: 'Free medical services and health check-ups',
            location: '456 Oak Ave, New York, NY'
        }
    ],
    jobs: [
        {
            id: '1',
            title: 'Software Developer',
            company: 'Tech Solutions Inc.',
            location: 'New York, NY',
            type: 'full-time',
            salary: '$80,000 - $100,000',
            description: 'Looking for an experienced software developer...',
            skills: ['JavaScript', 'React', 'Node.js']
        },
        {
            id: '2',
            title: 'UX Designer',
            company: 'Creative Designs',
            location: 'Remote',
            type: 'contract',
            salary: '$60 - $80 per hour',
            description: 'Join our design team...',
            skills: ['Figma', 'UI/UX', 'User Research']
        }
    ],
    posts: [
        {
            id: '1',
            author: 'Jane Smith',
            content: 'Just found a great resource for job training!',
            date: '2024-03-15T10:00:00Z',
            likes: 5,
            comments: 2
        },
        {
            id: '2',
            author: 'Mike Johnson',
            content: 'Anyone know of good healthcare resources in the area?',
            date: '2024-03-15T09:30:00Z',
            likes: 3,
            comments: 4
        }
    ]
};

// DOM Elements
const elements = {
    menuToggle: document.querySelector('.menu-toggle'),
    bottomNav: document.querySelector('.bottom-nav'),
    mainContent: document.querySelector('.main-content'),
    resourceSearch: document.getElementById('resource-search'),
    jobCategory: document.getElementById('job-category'),
    postsFeed: document.getElementById('posts-feed'),
    createPostBtn: document.querySelector('.create-post-btn')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Initialize App
function initializeApp() {
    // Check for saved user preferences
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        state.language = savedLanguage;
    }

    // Set up event listeners
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Menu Toggle
    elements.menuToggle?.addEventListener('click', toggleMenu);

    // Bottom Navigation
    elements.bottomNav?.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (navItem) {
            const page = navItem.dataset.page;
            if (page) {
                navigateTo(page);
            }
        }
    });

    // Resource Search
    elements.resourceSearch?.addEventListener('input', debounce(handleResourceSearch, 300));

    // Job Category Filter
    elements.jobCategory?.addEventListener('change', handleJobFilter);

    // Create Post Button
    elements.createPostBtn?.addEventListener('click', showCreatePostModal);
}

// Toggle Menu
function toggleMenu() {
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.classList.toggle('menu-open');
    }
}

// Navigation
function navigateTo(page) {
    state.currentPage = page;
    updateActiveNavItem();
}

function updateActiveNavItem() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === state.currentPage);
    });
}

// Resource Search
async function handleResourceSearch(e) {
    const query = e.target.value.trim();
    if (query.length < 2) return;

    try {
        const results = await searchResources(query);
        displayResourceResults(results);
    } catch (error) {
        console.error('Error searching resources:', error);
        showError('Failed to search resources. Please try again.');
    }
}

// Job Filtering
function handleJobFilter(e) {
    const category = e.target.value;
    const filteredJobs = filterJobs(category);
    displayJobs(filteredJobs);
}

// Post Management
function showCreatePostModal() {
    // Implementation for post creation modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Create Post</h2>
            <form id="create-post-form">
                <textarea placeholder="What's on your mind?" required></textarea>
                <div class="modal-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Post</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    setupPostModalListeners(modal);
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
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Data Loading Functions
async function loadResources() {
    try {
        // Simulated API call
        const response = await fetch('/api/resources');
        const data = await response.json();
        state.resources = data;
        displayResources(data);
    } catch (error) {
        console.error('Error loading resources:', error);
        showError('Failed to load resources. Please try again.');
    }
}

async function loadJobs() {
    try {
        // Simulated API call
        const response = await fetch('/api/jobs');
        const data = await response.json();
        state.jobs = data;
        displayJobs(data);
    } catch (error) {
        console.error('Error loading jobs:', error);
        showError('Failed to load jobs. Please try again.');
    }
}

async function loadPosts() {
    try {
        // Simulated API call
        const response = await fetch('/api/posts');
        const data = await response.json();
        state.posts = data;
        displayPosts(data);
    } catch (error) {
        console.error('Error loading posts:', error);
        showError('Failed to load posts. Please try again.');
    }
}

// Display Functions
function displayResources(resources) {
    const container = document.getElementById('resource-finder');
    if (!container) return;

    // Implementation for displaying resources
}

function displayJobs(jobs) {
    const container = document.getElementById('job-results');
    if (!container) return;

    container.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <div class="job-details">
                <span>${job.company}</span>
                <span>${job.location}</span>
                <span>${job.type}</span>
            </div>
            <p>${job.description}</p>
            <div class="job-tags">
                ${job.skills.map(skill => `<span class="job-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function displayPosts(posts) {
    const container = document.getElementById('posts-feed');
    if (!container) return;

    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <div class="post-avatar">${post.author[0]}</div>
                <div>
                    <h3>${post.author}</h3>
                    <span>${new Date(post.date).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <span class="post-action">👍 ${post.likes}</span>
                <span class="post-action">💬 ${post.comments}</span>
                <span class="post-action">🔄 Share</span>
            </div>
        </div>
    `).join('');
}

// Export for use in other modules
window.app = {
    state,
    mockData,
    navigateTo,
    showError,
    showSuccess
};

// Common app functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }

    // Handle bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}); 