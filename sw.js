const CACHE_NAME = 'etasv-training-hub-v3';
const urlsToCache = [
  './',
  './index.html',
  './journeyman-courses.html',
  './calculators.html',
  './course-bluebeam-fundamentals.html',
  './course-bluebeam-design.html',
  './course-hvac.html',
  './course-foremandevelopment.html',
  './course-firealarm.html',
  './course-fiberoptic.html',
  './course-mechanicalbending.html',
  './course-handbending.html',
  './course-microsoft365.html',
  './course-motorcontrols.html',
  './course-instrumentation.html',
  './course-osha10.html',
  './course-osha30.html',
  './course-nfpa70e.html',
  './course-photovoltaic.html',
  './course-calstac.html',
  './photos/etasv_logo.png',
  './manifest.json',
  './browserconfig.xml',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: All files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.log('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle navigation requests (when user navigates to a new page)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Service Worker: Serving navigation from cache', event.request.url);
            return response;
          }
          
          // If not in cache, fetch from network but ensure it stays in PWA context
          return fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                // Cache successful navigation responses
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, responseToCache);
                });
              }
              return response;
            })
            .catch(() => {
              // Return cached index.html for failed navigation (PWA shell)
              return caches.match('./index.html');
            });
        })
    );
    return;
  }

  // Skip external requests that aren't in our cache list
  if (!event.request.url.startsWith(self.location.origin) && 
      !urlsToCache.some(url => event.request.url.includes(url))) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }

        // Otherwise fetch from network
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request).then(response => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(error => {
          console.log('Service Worker: Fetch failed, serving offline page', error);
          
          // Return a basic offline message for HTML requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return new Response(`
              <html>
                <head>
                  <title>ETASV Training Hub - Offline</title>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { 
                      font-family: Arial, sans-serif; 
                      text-align: center; 
                      padding: 50px; 
                      background: #1E3A8A;
                      color: white;
                    }
                    .container {
                      max-width: 400px;
                      margin: 0 auto;
                      background: white;
                      color: #1E293B;
                      padding: 2rem;
                      border-radius: 1rem;
                    }
                    h1 { color: #1E3A8A; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>ETASV Training Hub</h1>
                    <h2>You're Offline</h2>
                    <p>This page isn't available offline. Please check your internet connection and try again.</p>
                    <button onclick="window.location.reload()">Try Again</button>
                  </div>
                </body>
              </html>
            `, {
              headers: { 'Content-Type': 'text/html' }
            });
          }
        });
      })
  );
});

// Handle background sync for form submissions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
});

// Handle push notifications (for future use)
self.addEventListener('push', event => {
  console.log('Service Worker: Push received', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('ETASV Training Hub', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});