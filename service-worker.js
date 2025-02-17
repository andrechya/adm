const cacheName = "offline-cache-v1";
const filesToCache = [
  "./",
  "./index.html",
  "./data.json",
  "./css/bootstrapMin.css",
  "./js/sweetalert2@11.js",
  "./favicon.ico",
  "./icon.png",
  "./manifest.json",
  "./notif.mp3"
];

// Install Service Worker & Cache Resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then(async (cache) => {
      try {
        await cache.addAll(filesToCache);
        console.log("✅ Semua file berhasil di-cache!");
      } catch (error) {
        console.error("❌ Cache gagal:", error);
      }
    })
  );
});

// Fetch Request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => caches.match("./index.html")) // Jika offline, buka index.html
  );
});
