const CACHE="dealcraft-v6";
const SHELL=["./DealCraft%20App.dc.html","./support.js","./data/bundle/ma.js","./data/bundle/cl.js","./data/bundle/tc.js","./data/bundle/pb.js","./data/rewrites.js","./data/rewrites2.js","./data/rewrites3.js","./data/rewrites4.js","./data/law302.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
// Same-origin: network first (edits show immediately), cache as offline fallback.
// Fonts / React CDN: cache first (versioned, immutable).
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  const u=new URL(r.url);
  const put=res=>{ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(r,cp)); return res; };
  if(u.origin===location.origin){ e.respondWith(fetch(r).then(put).catch(()=>caches.match(r))); return; }
  if(/fonts\.(googleapis|gstatic)\.com|unpkg\.com/.test(u.host)){ e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put))); }
});
