const CACHE_NAME = 'site-personnel-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/404.html',
  '/img/profil.jpg',
  '/yann_blanc_cv_asi.pdf',
];

// Ajustement des chemins pour différents environnements
const adjustUrl = (url) => {
  const hostname = self.location.hostname;
  
  // Si nous sommes sur localhost avec le serveur de développement
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Vérifier si nous utilisons le port 3000 (serve) ou 5173/autre (vite dev)
    const isServe = self.location.port === '3000';
    
    if (isServe) {
      // Pour 'npx serve -s dist', qui simule une racine au point de service
      return url;
    } else {
      // Pour vite serve, qui garde la structure de fichiers normale
      return url;
    }
  } 
  // Si nous sommes sur GitHub Pages
  else if (hostname.includes('github.io')) {
    // Ajouter le préfixe /site-personnel si pas déjà présent
    if (!url.startsWith('/site-personnel')) {
      return url === '/' ? '/site-personnel/' : `/site-personnel${url}`;
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
  // Afficher les requêtes dans la console pour le débogage
  console.log('Service Worker: Fetching', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si le cache contient une réponse pour cette requête, la retourner
        if (response) {
          console.log('Service Worker: Return from cache', event.request.url);
          return response;
        }
        
        // Sinon, faire une requête au réseau
        console.log('Service Worker: Network request for', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Si la réponse est invalide, la retourner telle quelle
            if (!response || response.status !== 200 || response.type !== 'basic') {
              console.log('Service Worker: Non-cacheable response', event.request.url);
              return response;
            }
            
            // Cloner la réponse pour le cache et la retourner
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                console.log('Service Worker: Caching new resource', event.request.url);
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed:', error);
            // Vous pourriez retourner une page d'erreur personnalisée ici
          });
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation Complete');
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