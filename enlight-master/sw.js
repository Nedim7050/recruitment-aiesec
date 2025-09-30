/**
 * AIESEC Carthage - Service Worker (NO CACHE MODE)
 * Désactivé pour éviter les problèmes de cache
 */

const CACHE_NAME = 'aiesec-no-cache-' + Date.now();

// Install - Skip caching
self.addEventListener('install', function(event) {
  console.log('[SW] Installing... NO CACHE MODE');
  self.skipWaiting(); // Activate immediately
});

// Activate - Delete ALL caches
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating... Clearing ALL caches');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('[SW] Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('[SW] All caches cleared');
      return self.clients.claim();
    })
  );
});

// Fetch - ALWAYS fetch fresh from network (NO CACHE)
self.addEventListener('fetch', function(event) {
  console.log('[SW] Fetching FRESH:', event.request.url);
  
  event.respondWith(
    fetch(event.request.clone(), {
      cache: 'no-store' // Force no cache
    })
    .then(function(response) {
      // Return fresh response, never cache
      console.log('[SW] Fresh response for:', event.request.url);
      return response;
    })
    .catch(function(error) {
      console.error('[SW] Fetch failed:', error);
      // Return a basic error response
      return new Response('Network error - Please check your connection', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      });
    })
  );
});

console.log('[SW] Service Worker loaded in NO CACHE mode');