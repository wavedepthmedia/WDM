export class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.menu = document.querySelector('.mobile-menu');
    this.body = document.body;
    this.isOpen = false;

    this.init();
  }

  init() {
    // Проверка существования элементов
    if (!this.hamburger || !this.menu) {
      console.error('Mobile menu elements not found!');
      return;
    }

    // Обработчики событий
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.body.classList.toggle('menu-open', this.isOpen);
    this.menu.classList.toggle('active', this.isOpen);
    this.hamburger.setAttribute('aria-expanded', this.isOpen);
  }

  handleOutsideClick(e) {
    if (this.isOpen && 
        !this.menu.contains(e.target) && 
        !this.hamburger.contains(e.target)) {
      this.toggleMenu();
    }
  }

  handleResize() {
    if (window.innerWidth > 768 && this.isOpen) {
      this.toggleMenu();
    }
  }
}
