const CACHE_NAME = 'site-personnel-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/404.html',
  '/img/profil.jpg',
  '/yann_blanc_cv_asi.pdf',
];

// Simplification de l'ajustement des chemins
const adjustUrl = (url) => {
  const isGitHub = self.location.hostname.includes('github.io');
  if (isGitHub) {
    const basePath = '/yannblanc75Web.github.io/';
    if (!url.startsWith(basePath) && url !== '/') {
      return url === '/' ? basePath : `${basePath}${url.substring(1)}`;
    }
  }
  return url;
};

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache.map(url => adjustUrl(url)));
      })
      .then(() => {
        console.log('Service Worker: Installation Complete');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Recevoir des messages du client pour le débogage
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});