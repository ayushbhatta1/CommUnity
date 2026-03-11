// App State Management
const state = {
    currentPage: 'home',
    user: {
        name: 'John Doe',
        email: 'john.doe@example.com'
    },
    language: 'en'
};

// DOM Elements
const elements = {
    menuToggle: document.querySelector('.menu-toggle'),
    bottomNav: document.querySelector('.bottom-nav'),
    mainContent: document.querySelector('.main-content'),
    postsFeed: document.getElementById('posts-list'),
    createPostBtn: document.querySelector('.create-post-btn')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize App
function initializeApp() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        state.language = savedLanguage;
    }
    setupEventListeners();
    registerServiceWorker();
}

// Register Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service worker registered:', reg.scope))
            .catch(err => console.error('Service worker registration failed:', err));
    }
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

    // Create Post Button
    elements.createPostBtn?.addEventListener('click', showCreatePostModal);
}

// Toggle Menu
function toggleMenu() {
    const mainNav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.menu-toggle');
    if (mainNav) {
        const isOpen = mainNav.classList.toggle('menu-open');
        toggle?.setAttribute('aria-expanded', String(isOpen));
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


// Post Management
function showCreatePostModal() {
    const triggerEl = document.activeElement; // Remember what triggered the modal

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'create-post-title');
    modal.innerHTML = `
        <div class="modal-content">
            <h2 id="create-post-title">Create Post</h2>
            <form id="create-post-form">
                <label for="post-textarea" class="sr-only">Post content</label>
                <textarea id="post-textarea" placeholder="What's on your mind?" required></textarea>
                <div class="modal-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Post</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Move focus into the modal
    const textarea = modal.querySelector('textarea');
    textarea.focus();

    // Close helper — removes modal and restores focus
    function closeModal() {
        modal.remove();
        if (triggerEl && triggerEl.focus) triggerEl.focus();
    }

    // Escape key closes modal + focus trap
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }

        // Focus trap: keep Tab within modal
        if (e.key === 'Tab') {
            const focusableEls = modal.querySelectorAll(
                'textarea, button, [tabindex]:not([tabindex="-1"])'
            );
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        }
    });

    // Cancel button
    modal.querySelector('.cancel-btn')?.addEventListener('click', closeModal);

    // Form submit
    modal.querySelector('#create-post-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = textarea.value.trim();
        if (!content) return;

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: state.user.name,
                    content
                })
            });
            if (response.ok) {
                closeModal();
                showSuccess('Post created successfully!');
                loadPosts();
            } else {
                showError('Failed to create post. Please try again.');
            }
        } catch (error) {
            showError('Failed to create post. Please try again.');
        }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Data Loading Functions
async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        state.posts = data;
        displayPosts(data);
    } catch (error) {
        console.error('Error loading posts:', error);
        showError('Failed to load posts. Please try again.');
    }
}

// Display Functions
function displayPosts(posts) {
    const container = document.getElementById('posts-list');
    if (!container) return;

    if (!posts || posts.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--text-light); padding:2rem;">No posts yet. Be the first to share!</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post-card" role="article">
            <div class="post-header">
                <div class="post-avatar" aria-hidden="true">${escapeHTML(post.author[0])}</div>
                <div>
                    <h3>${escapeHTML(post.author)}</h3>
                    <span class="post-time">${new Date(post.date).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="post-content">${escapeHTML(post.content)}</div>
            <div class="post-actions">
                <button class="post-action-btn" aria-label="Like post">&#128077; ${post.likes}</button>
                <button class="post-action-btn" aria-label="Comment on post">&#128172; ${post.comments}</button>
                <button class="post-action-btn" aria-label="Share post">&#128260; Share</button>
            </div>
        </div>
    `).join('');
}

// Export for use in other modules
window.app = {
    state,
    navigateTo,
    showError,
    showSuccess
};
