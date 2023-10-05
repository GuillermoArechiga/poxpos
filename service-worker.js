const CACHE_NAME = 'my-pwa-cache-v2'; // Increment version when assets change

// Define an array of URLs to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  // Add more URLs to cache as needed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened');
      // Cache all specified URLs
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try to find the requested resource in the cache
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // If found in cache, return the cached response
        return cachedResponse;
      }

      // If not found in cache, try fetching from the network
      return fetch(event.request)
        .then((response) => {
          // Check if the response is valid (status code 200)
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response; // Return the network response as-is
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          // Cache the fetched response for future use
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response; // Return the network response
        })
        .catch(() => {
          // If fetching from the network fails, return a custom offline page
          return caches.match('/offline.html');
        });
    })
  );
});
