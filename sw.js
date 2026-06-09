const CACHE = 'ailter-v1';
const ASSETS = [
  './',
  './Ailter App.html',
  './Ailter Design System.html',
  './app.css',
  './ds.css',
  './tokens.css',
  './assets/mascot-greet.png',
  './assets/mascot-detective.png',
  './assets/case-study.png',
  './assets/learn-deepfake.png',
  './assets/learn-image.png',
  './assets/logo-instagram.png',
  './assets/logo-tiktok.png',
  './assets/logo-youtube.png',
  './assets/reels-instagram.png',
  './assets/reels-tiktok.png',
  './assets/reels-youtube.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
