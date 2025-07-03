const CACHE_NAME = "nobrainer-group-v1"
const urlsToCache = [
  "/",
  "/pricing",
  "/smb-solutions",
  "/contact",
  "/services",
  "/about",
  "/process",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        // Claim all clients immediately
        return self.clients.claim()
      }),
  )
})
