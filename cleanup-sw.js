(() => {
  'use strict';
  if (!('serviceWorker' in navigator)) return;

  const KEY = 'websiteKelasSwCleanupDone';
  if (sessionStorage.getItem(KEY) === '1') return;

  navigator.serviceWorker.getRegistrations()
    .then(async registrations => {
      if (!registrations.length) return;
      await Promise.all(registrations.map(reg => reg.unregister()));
      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
      }
      sessionStorage.setItem(KEY, '1');
      window.location.reload();
    })
    .catch(() => {});
})();
