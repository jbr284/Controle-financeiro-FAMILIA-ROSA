
const CACHE_NAME = 'financeiro-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css', // Se houver
  '/js/script.js',  // Se houver
  '/icon-192x192.png',
  '/icon-512x512.png',
  // Adicione aqui outros arquivos que você deseja cachear
];

// Instalando o service worker e cacheando os arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativando o service worker e limpando caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptando requisições e fornecendo arquivos do cache, se possível
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
