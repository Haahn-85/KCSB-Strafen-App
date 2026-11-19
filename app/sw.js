// Offline: alles beim Installieren in den Cache. Antworten kommen sofort aus dem Cache,
// im Hintergrund wird nachgeladen; eine neue Fassung ist also beim übernächsten Start da.
const CACHE = 'kcsb-strafen';
const DATEIEN = [
  './', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'qrcode.js',
  'fonts/barlow-400.woff2', 'fonts/barlow-500.woff2', 'fonts/barlow-600.woff2', 'fonts/barlow-700.woff2',
  'fonts/barlowcondensed-600.woff2', 'fonts/barlowcondensed-700.woff2',
  '../daten/stammdaten.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const neu = caches.open(CACHE).then(c => fetch(e.request).then(r => r.ok ? c.put(e.request, r.clone()).then(() => r) : r));
  e.waitUntil(neu.catch(() => {}));
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(alt => alt || neu));
});
