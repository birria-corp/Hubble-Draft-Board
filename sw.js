const CACHE_VERSION = '1.0';
const CACHE_NAME = `hdb-v${CACHE_VERSION}`;
const NETWORK_FIRST = ['/', '/index.html', '/version.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const path = url.pathname;
  if (NETWORK_FIRST.some(p => path.endsWith(p))) {
    e.respondWith(
      fetch(e.request).then(r => {
        const rc = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, rc));
        return r;
      }).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(nr => {
        const rc = nr.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, rc));
        return nr;
      }))
    );
  }
});
