import Preloader from './core/preloader.js';
import MobileMenu from './core/mobile-menu.js';
import { PartnersCarousel } from './modules/partners-carousel.js';
import { MediaPlayer } from './modules/media-player.js';
import { Preloader } from '../js/core/preloader.js';

document.addEventListener('DOMContentLoaded', () => {
  const preloader = new Preloader();
  preloader.init();
});

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация прелоадера
  const preloader = new Preloader();
  preloader.init();

  // Мобильное меню
  const mobileMenu = new MobileMenu();

  // Карусель партнёров
  const partnersCarousel = new PartnersCarousel('.partners-grid');

  // Радио плеер
  const radioPlayer = new MediaPlayer('#radio-player');

  // Портфолио
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      // Логика открытия проекта
    });
  });
});

window.addEventListener('load', () => {
  // Анимации после полной загрузки
  document.body.classList.add('loaded');
});
