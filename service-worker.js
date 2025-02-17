const CACHE_NAME = "tts-offline-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "manifest.json"
];

// Install Service Worker dan cache file
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Fetch file dari cache jika offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
