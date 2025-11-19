export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('✅ [PWA] Service Worker registrado:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('🔄 [PWA] Nova atualização disponível.');
                } else {
                  console.log('✅ [PWA] App pronto para uso offline.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('❌ [PWA] Erro no registro:', error);
        });
    });
  }
}