const CACHE_NAME = 'tinkervault-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './logo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('✅ Assets werden gecacht');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Entweder aus dem Cache laden oder normal aus dem Netzwerk
            return response || fetch(event.request);
        })
    );
});
