const CACHE_NAME = 'tinkervault-cache-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './logo.png'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Erzwingt sofortiges Update
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('✅ Assets werden gecacht (v2)');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', event => {
    // Löscht alte Caches (z.B. v1), damit der PC nicht festhängt
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});
