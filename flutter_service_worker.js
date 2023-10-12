'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "0208ae00d450c0d81d2d24df6b7020c5",
"assets/AssetManifest.json": "bfb666cfd32813039a6b83277cd0c553",
"assets/assets/animations/4283-8836-developer.riv": "f5fdcfb651624fb38e762636e5620622",
"assets/assets/animations/intro_animation.riv": "a61dfb298b1099ae5160671ef3cf7249",
"assets/assets/fonts/Preahvihear-Regular.ttf": "b728ff1cdead5239b67535d2073baf70",
"assets/assets/icons/aws.svg": "71a20edd4b10d155a634d7efc6827532",
"assets/assets/icons/bootstrap.svg": "01783d9e9e01f5c8461bbff27175731b",
"assets/assets/icons/c++.svg": "951e0f370482b5861bb0744ddb24ae70",
"assets/assets/icons/c.svg": "7984f1f99e00b58e6402c5624e1dc298",
"assets/assets/icons/css.svg": "cba10c7c1ce484b82ab9b156b9abc74a",
"assets/assets/icons/dart.svg": "384ad99903293e87f01f49214db88050",
"assets/assets/icons/docker.svg": "8fd5c2c8ba202e03937af0ee5bceac6a",
"assets/assets/icons/firebase.svg": "ab7d48c559d630e419778d14e228988b",
"assets/assets/icons/flutter.svg": "9df4f9d9c9a790e3d95e72f1584e2187",
"assets/assets/icons/git.png": "91e38c1fb4b2410c06d56542d09086d0",
"assets/assets/icons/github.svg": "b8aeb451034beeaf0148cfbd7d9d8226",
"assets/assets/icons/go.png": "4121d0e7d0eabfd18efc3cc2c49744b9",
"assets/assets/icons/html.svg": "3359119defc88a608e351bf75e18efc8",
"assets/assets/icons/insta.svg": "97bbc4283f38a1eb007226e05da1d86b",
"assets/assets/icons/k8.svg": "92f74c5387269bc2c41d44935990fb75",
"assets/assets/icons/linkedin.svg": "681c4fa9689d5e3c0a36270793d71244",
"assets/assets/icons/linux.png": "e1e82f42a889005f38806051f50b58c9",
"assets/assets/icons/mongo.svg": "5929aeee3ce5495b9475613e2fae694f",
"assets/assets/icons/node.svg": "805c64b7e3dcac55f50a38d7d13c6621",
"assets/assets/icons/postman.svg": "fbfb57a181ce251926d686d12e6cee5a",
"assets/assets/icons/python.svg": "0b948ab5dd3f9e988cd9130da860408f",
"assets/assets/icons/tf.svg": "a8e1846d166da9c0f14034a265c87986",
"assets/assets/icons/ts.svg": "265f332738c918914d039db95271af46",
"assets/assets/icons/youtube.svg": "052394d191ee28ed25bf1adf50121bcf",
"assets/assets/images/bookmark_image.png": "37c960601041899f682a60d84e4587c7",
"assets/assets/images/bulb_image.png": "3a63566961962814a4655345b630457e",
"assets/assets/images/cup_image.png": "ec0c90ea4804d05bf8855c3164ad5825",
"assets/assets/images/my.jpg": "2857f649be7997231af267d3c3cf3ef6",
"assets/assets/images/picker_image.png": "a4a5d9191de6dfd8776bee2968f95ba4",
"assets/assets/images/sifat.jpg": "dd8c045344fc5e396ead8c211bf9b61b",
"assets/assets/project_image/dh.mp4": "fcc147f3cdd0ca2c1cf01ecf1e32df37",
"assets/assets/project_image/dh.png": "ba6b6050308571a33f96b1d04914d92b",
"assets/assets/project_image/hhhf.mp4": "9f19f6e246f85a3e6b9348031e5ef879",
"assets/assets/project_image/hhhf.png": "67410ab916fa679cd1845bc9e19fbc9a",
"assets/assets/project_image/lra.mp4": "f6744ce8d6d7545a0a5a825022ef3291",
"assets/assets/project_image/lrs.png": "7499958e3ac3ce62d7dd28235c3bf0e7",
"assets/assets/project_image/ostad.mp4": "62168d86f7ac33543551dbe7e03d04bd",
"assets/assets/project_image/ostadjee.webp": "18b779029af81d2e1c0d91e061aff1c7",
"assets/assets/project_image/soumi.webp": "59959253bd1bfaa7d7f7164ef7d5c70c",
"assets/assets/project_image/tma.mp4": "dcd540f8de6147d3bc5e1fb0475fa5a9",
"assets/assets/project_image/todo.png": "803a66cadbcb0ecd2ecefb5a2da224f6",
"assets/assets/project_image/wallify.mp4": "43a05563581f9a73750785f3bfa41e29",
"assets/assets/project_image/wallify.png": "8842a4c2ff18b8e7b217fb741a28f526",
"assets/FontManifest.json": "0ad6e963711c6c7d4037575edccb012f",
"assets/fonts/MaterialIcons-Regular.otf": "2ed0bb8e159c15e75440f0b6ecbbf25d",
"assets/NOTICES": "e116d738c43e89cff4f53eefa993b169",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "f2163b9d4e6f1ea52063f498c8878bb9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d7791ef376c159f302b8ad90a748d2ab",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "5070443340d1d8cceb516d02c3d6dee7",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "658b490c9da97710b01bd0f8825fce94",
"assets/packages/social_media_flutter/fonts/icons.ttf": "7dae615e8df7bf5bf381bf713850ac33",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "b77e4a467b8db5beb342eb01f777560f",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "845480d37cc920806764af09672f41e1",
"icons/Icon-512.png": "24ee7aab2b43bd64c4b8f2c66ff5d299",
"index.html": "60de0a56806ea0c5464a364899905960",
"/": "60de0a56806ea0c5464a364899905960",
"main.dart.js": "8fe29c2eb8931ba4e328793890d7ab71",
"manifest.json": "f48ee6affe8b7d96d2d19e513af6b6b2",
"version.json": "4aadde7e9c654bc14ef881b1bae88c9b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
