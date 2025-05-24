export const optimizeAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.willChange = 'transform, opacity';
      } else {
        entry.target.style.willChange = 'auto';
      }
    });
  });

  document.querySelectorAll('[data-animate]').forEach(el => 
    observer.observe(el));
};

export const lazyLoadMedia = () => {
  const lazyMedia = document.querySelectorAll('[data-src]');
  
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const elem = entry.target;
        if(elem.dataset.src) {
          elem.src = elem.dataset.src;
        }
        if(elem.dataset.srcset) {
          elem.srcset = elem.dataset.srcset;
        }
        lazyObserver.unobserve(elem);
      }
    });
  });

  lazyMedia.forEach(media => lazyObserver.observe(media));
};
