//Asignar nombre y version de la cache

const CACHE_NAME = 'v1_cache_santiago_yaguargos_pwa'

//Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/styles.css',
    './img/logo.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/facebook.png',

];

//Evento install
//Instalacion del service worker y guardar en cache recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                        });
                    })
                    .catch(err => console.log('No se ha cargado la cache', err))
    );
});

//Evento activate
//Que la app funcione sin conexión

self.addEventListener('activate', e=> {
    const cacheWhitelist =[CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            // Borrrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=>{
                //Activar cache
                self.clients.claim();
            })
    );
});

//Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    // Devuelvo datos desde cache
                    return res;

                }

                return fetch(e.request);
            })

    );
});