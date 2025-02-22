if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log("✅ Service Worker Terdaftar!"))
      .catch(error => console.log("❌ Service Worker Gagal:", error));
  }