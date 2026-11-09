(function () {
  if (!('serviceWorker' in navigator)) return;

  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (location.protocol !== 'https:' && !isLocal) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js', {
      scope: './',
      updateViaCache: 'none'
    }).catch(function (error) {
      console.warn('NeZha service worker registration failed:', error);
    });
  });
})();
