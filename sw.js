const CACHE_NAME = 'community-v3';
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
    // Skip API requests — always go to network
    if (event.request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    (response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-posts') {
        event.waitUntil(syncPosts());
    }
});

// Push Notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
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
