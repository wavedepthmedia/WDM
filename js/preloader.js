class Preloader {
    constructor() {
        this.preloader = document.querySelector('.preloader');
        this.percentElement = document.querySelector('.loader-digit');
        this.progressBar = document.querySelector('.loader-progress');
        this.minDisplayTime = 2000;
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.setupProgressAnimation();
        window.addEventListener('load', () => this.handleLoadComplete());
    }

    setupProgressAnimation() {
        let current = 0;
        const target = 100;
        const duration = 2500;

        const update = timestamp => {
            if (!this.start) this.start = timestamp;
            const progress = timestamp - this.start;
            
            current = Math.min(target, (progress / duration) * target);
            this.percentElement.textContent = `${Math.floor(current)}%`;
            this.progressBar.style.width = `${current}%`;

            if (current < target) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    handleLoadComplete() {
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(this.minDisplayTime - elapsed, 0);

        setTimeout(() => {
            this.preloader.style.opacity = '0';
            setTimeout(() => {
                this.preloader.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 1000);
        }, remaining);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => new Preloader());
