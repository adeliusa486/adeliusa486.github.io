// Minimal service worker — makes the app installable (PWA/APK) and lets the
// shell load offline. The Gemini call itself still needs internet.
const CACHE = "solver-v1";
const ASSETS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const url = e.request.url;
  // never cache API calls
  if (url.includes("googleapis.com")) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
