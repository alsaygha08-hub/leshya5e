const CACHE_NAME = 'e3sm3-cache-v1';
const FILES_TO_CACHE = [
  "./3.png",
  "./8.png",
  "./9.png",
  "./E3SM3.html",
  "./E3_4_SM3_Inst.mp3",
  "./E3_E4_End.mp3",
  "./E3_SM3_Intro.mp3",
  "./g1.mp3",
  "./g10.mp3",
  "./g2.mp3",
  "./g3.mp3",
  "./g4.mp3",
  "./g7.mp3",
  "./g8.mp3",
  "./g9.mp3",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./jquery-3.6.4.min.js",
  "./jquery-ui.min.js",
  "./jquery.ui.touch-punch.min.js",
  "./loading.gif",
  "./manifest.json",
  "./prompts.js"
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});
