// Прелоадер
window.addEventListener('load', () => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    document.querySelector('.progress').textContent = 
      `${Math.min(100, Math.floor(progress))}%`;
    if(progress >= 100) {
      clearInterval(interval);
      document.querySelector('.preloader').style.display = 'none';
    }
  }, 100);
});

// Мобильное меню
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.add('active');
});

document.querySelector('.menu-close').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.remove('active');
});

// Слайдер
const initSwiper = () => {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    effect: 'coverflow',
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

// Ленивая загрузка
const lazyLoad = () => {
  const lazyloadImages = document.querySelectorAll('.lazyload');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazyload');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyloadImages.forEach((img) => {
    imageObserver.observe(img);
  });
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector('.swiper-container')) initSwiper();
  lazyLoad();
});
