class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.menu = document.querySelector('.mobile-menu');
    this.body = document.body;
    this.initEvents();
  }

  toggleMenu() {
    this.body.classList.toggle('menu-open');
    this.menu.classList.toggle('active');
  }

  closeMenuOnClickOutside(e) {
    if(!this.menu.contains(e.target) && !this.hamburger.contains(e.target)) {
      this.body.classList.remove('menu-open');
      this.menu.classList.remove('active');
    }
  }

  initEvents() {
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    document.addEventListener('click', (e) => this.closeMenuOnClickOutside(e));
    window.addEventListener('resize', () => {
      if(window.innerWidth > 768) {
        this.body.classList.remove('menu-open');
        this.menu.classList.remove('active');
      }
    });
  }
}

export default MobileMenu;
