const CACHE_VERSION = 'nezha-pwa-v4';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './pwa.js',
  './curriculum.js',
  './content-data.js',
  './curriculum-ext.js',
  './ielts-curriculum.js',
  './exams.js',
  './exams-ecba.js',
  './exams-cfa.js',
  './exams-ielts.js',
  './assets/ielts/listening/ielts-listening-mock-1-part-1.m4a',
  './assets/ielts/listening/ielts-listening-mock-1-part-2.m4a',
  './assets/ielts/listening/ielts-listening-mock-1-part-3.m4a',
  './assets/ielts/listening/ielts-listening-mock-1-part-4.m4a',
  './cfa-assessments.js',
  './cfa-assessments-phase0.js',
  './cfa-assessments-phase1a.js',
  './cfa-blueprint.js',
  './cfa-formulas.js',
  './cfa-foundations.js',
  './cfa-quant.js',
  './app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
