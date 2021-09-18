const assets = [
    "/",
    "/index.html",
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open("inSOgram").then(cache => {
        cache.addAll(assets);
    }));
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(res =>
        res || fetch(e.request)
    ));
});