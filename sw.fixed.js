// Fixed for GitHub Pages subpath + deterministic cache
const BASE = '/leshya5e/';
const CACHE_NAME = 'e3sm3-cache-v3';

const FILES_TO_CACHE = [
  BASE,
  BASE + 'index.html',
  BASE + '404.html',
  BASE + 'manifest.json',
  BASE + 'sw.js',
  BASE + 'jquery-3.6.4.min.js',
  BASE + 'jquery-ui.min.js',
  BASE + 'jquery.ui.touch-punch.min.js',
  BASE + 'loading.gif',
  BASE + 'prompts.js',

  // App audio
  BASE + 'E3_SM3_Intro.mp3',
  BASE + 'E3_4_SM3_Inst.mp3',
  BASE + 'E3_E4_End.mp3',

  // Question audio (ensure full set so it works offline)
  BASE + 'g1.mp3',
  BASE + 'g2.mp3',
  BASE + 'g3.mp3',
  BASE + 'g4.mp3',
  BASE + 'g5.mp3',
  BASE + 'g6.mp3',
  BASE + 'g7.mp3',
  BASE + 'g8.mp3',
  BASE + 'g9.mp3',
  BASE + 'g10.mp3',

  // Images used by prompts
  BASE + '1.png',
  BASE + '2.png',
  BASE + '3.png',
  BASE + '7.png',
  BASE + '8.png',
  BASE + '9.png',
  BASE + '10.png',

  // Icons (PWA)
  BASE + 'icon-192.png',
  BASE + 'icon-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => Promise.all(
      keyList.map((key) => key !== CACHE_NAME ? caches.delete(key) : undefined)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => response || fetch(evt.request))
  );
});