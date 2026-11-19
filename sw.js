const CACHE_NAME = 'community-v4';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/dashboard.css',
    '/css/resources.css',
    '/js/utils.js',
    '/js/app.js',
    '/js/chat.js',
    '/js/maps.js',
    '/js/jobs.js',
    '/js/resources.js',
    '/js/profile.js',
    '/js/translate.js',
    '/pages/resources.html',
    '/pages/jobs.html',
    '/pages/community.html',
    '/pages/profile.html',
    '/manifest.json',
    '/assets/logo.svg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate new SW immediately
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of all open pages
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Only same-origin GETs are cached. API calls, POSTs and third-party
    // requests (map tiles, CDNs) go straight to the network.
    if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
        return;
    }

    // Network first, cache as the offline fallback. The old cache-first
    // strategy kept serving the first JS/CSS a visitor ever downloaded until
    // CACHE_NAME was bumped by hand, so fixes never reached returning users.
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return response;
            })
            .catch(() => caches.match(request).then((cached) => {
                if (cached) return cached;
                // Offline page load: fall back to the cached app shell
                if (request.mode === 'navigate') return caches.match('/index.html');
                return Response.error();
            }))
    );
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-posts') {
        event.waitUntil(syncPosts());
    }
});

// Push Notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'You have a new update.',
        icon: '/assets/logo.svg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('CommUnity', options)
    );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});

// IndexedDB Helper — returns a wrapper with proper IDB transaction methods
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('community-db', 1);

        request.onerror = () => reject(request.error);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('posts')) {
                db.createObjectStore('posts', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => {
            const db = request.result;
            // Wrap with helper methods that use proper IDB transactions
            resolve({
                getAll(storeName) {
                    return new Promise((res, rej) => {
                        const tx = db.transaction(storeName, 'readonly');
                        const store = tx.objectStore(storeName);
                        const req = store.getAll();
                        req.onsuccess = () => res(req.result);
                        req.onerror = () => rej(req.error);
                    });
                },
                put(storeName, value) {
                    return new Promise((res, rej) => {
                        const tx = db.transaction(storeName, 'readwrite');
                        const store = tx.objectStore(storeName);
                        const req = store.put(value);
                        req.onsuccess = () => res(req.result);
                        req.onerror = () => rej(req.error);
                    });
                }
            });
        };
    });
}

// Sync unsynced posts to the server
async function syncPosts() {
    try {
        const db = await openDB();
        const posts = await db.getAll('posts');

        for (const post of posts) {
            if (!post.synced) {
                await syncPost(post, db);
            }
        }
    } catch (error) {
        console.error('Error syncing posts:', error);
    }
}

async function syncPost(post, db) {
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (response.ok) {
            post.synced = true;
            await db.put('posts', post);
        }
    } catch (error) {
        console.error('Error syncing post:', error);
    }
}
