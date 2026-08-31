(function(){
  const cfg = window.smartSwapConfig && window.smartSwapConfig.hero ? window.smartSwapConfig.hero : { images: ['assets/phones/phone-hero-1.png'], intervalMs: 4000 };
  const images = cfg.images || ['assets/phones/phone-hero-1.png'];
  const image = document.querySelector('.phone-main');
  if(!image) return;

  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    image.src = images[index];
  }, cfg.intervalMs || 4000);
})();
