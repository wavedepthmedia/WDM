// Lazy Load Module
export class LazyLoader {
  constructor() {
    this.observer = null;
    this.config = {
      rootMargin: '0px 0px 100px 0px',
      threshold: 0.01
    };
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.config
      );
      
      document.querySelectorAll('[data-src]').forEach(element => {
        this.observer.observe(element);
      });
    } else {
      this.loadAllImmediately();
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadElement(element) {
    const src = element.dataset.src;
    const srcset = element.dataset.srcset;

    if (src) {
      element.src = src;
    }
    if (srcset) {
      element.srcset = srcset;
    }

    element.onload = () => {
      element.removeAttribute('data-src');
      element.classList.add('loaded');
    };

    element.onerror = () => {
      console.error('Error loading image:', src);
      element.classList.add('load-error');
    };
  }

  loadAllImmediately() {
    document.querySelectorAll('[data-src]').forEach(element => {
      this.loadElement(element);
    });
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  new LazyLoader();
});
