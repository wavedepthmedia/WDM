export class PartnersCarousel {
  constructor(containerSelector) {
    this.carousel = document.querySelector(containerSelector);
    this.items = Array.from(this.carousel.children);
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  cloneItems() {
    const clones = this.items.map(item => item.cloneNode(true));
    clones.forEach(clone => this.carousel.appendChild(clone));
  }

  animate() {
    const itemWidth = this.items[0].offsetWidth;
    this.currentIndex++;
    
    this.carousel.style.transition = 'transform 0.5s ease-in-out';
    this.carousel.style.transform = `translateX(-${itemWidth * this.currentIndex}px)`;

    this.carousel.addEventListener('transitionend', () => {
      if(this.currentIndex >= this.items.length) {
        this.carousel.style.transition = 'none';
        this.currentIndex = 0;
        this.carousel.style.transform = 'translateX(0)';
      }
    }, { once: true });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.animate(), 3000);
  }

  handleHover() {
    this.carousel.addEventListener('mouseenter', () => 
      clearInterval(this.autoPlayInterval));
    this.carousel.addEventListener('mouseleave', () => 
      this.startAutoPlay());
  }

  init() {
    this.cloneItems();
    this.startAutoPlay();
    this.handleHover();
  }
}
