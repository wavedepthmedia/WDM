// Animation On Scroll Library
const AOS = (() => {
    const elements = [];
    let lastPosition = -1;
    
    const init = (config = {}) => {
        window.addEventListener('scroll', throttle(checkPosition, 100));
        window.addEventListener('resize', throttle(checkPosition, 100));
        checkPosition();
    };

    const throttle = (fn, wait) => {
        let time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    };

    const checkPosition = () => {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
            
            if (inView && !el.aosAnimated) {
                animateElement(el);
                el.aosAnimated = true;
            }
        });
    };

    const animateElement = el => {
        const type = el.dataset.aos || 'fade-up';
        const delay = el.dataset.aosDelay || 0;
        const duration = el.dataset.aosDuration || 800;
        
        el.style.transition = `
            opacity ${duration}ms ease,
            transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)
        `;
        
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = getTransform(type, false);
        }, delay);
    };

    const getTransform = (type, initial) => {
        const transforms = {
            'fade-up': initial ? 'translateY(40px)' : 'translateY(0)',
            'zoom-in': initial ? 'scale(0.8)' : 'scale(1)'
        };
        return transforms[type] || '';
    };

    return { init };
})();
