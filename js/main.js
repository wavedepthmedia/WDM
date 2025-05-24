// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Фиксированное меню
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// Переключение тарифов
document.addEventListener('DOMContentLoaded', () => {
    const tariffButtons = document.querySelectorAll('.tariff-switcher__btn');
    
    tariffButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            tariffButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            // Получаем ID контента
            const targetTab = button.dataset.target;
            
            // Скрываем все табы
            document.querySelectorAll('.tariff-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Показываем целевой таб
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Инициализация компонентов
document.addEventListener('DOMContentLoaded', () => {
    // Анимация элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Инициализация при загрузке
});
// Мобильное меню
const burger = document.querySelector('.burger');
const body = document.body;

burger.addEventListener('click', () => {
    body.classList.toggle('menu-open');
});

// Закрытие меню при клике вне области
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav__links') && 
        !e.target.closest('.burger') &&
        body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
    }
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            body.classList.remove('menu-open');
        }
    });
});

// Плавный скролл для мобильного меню
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            body.classList.remove('menu-open');
            
            // Плавный переход
            const target = document.querySelector(link.getAttribute('href'));
            if(target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновление URL без перезагрузки
                setTimeout(() => {
                    history.pushState(null, null, link.href);
                }, 400);
            }
        }
    });
});

// Закрытие меню при изменении ориентации
window.addEventListener('orientationchange', () => {
    if(window.innerWidth > 1024) {
        body.classList.remove('menu-open');
    }
});
