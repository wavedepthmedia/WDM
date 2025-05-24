class Preloader {
    constructor() {
        this.preloader = document.querySelector('.preloader');
        this.percentElement = document.querySelector('.preloader__percent');
        this.progressBar = document.querySelector('.preloader__progress');
        this.minimumDisplayTime = 1500; // Минимальное время показа в ms
        this.startTime = Date.now();
        
        this.init();
    }

    init() {
        this.animateProgress();
        window.addEventListener('load', () => this.finishLoading());
    }

    animateProgress() {
        let currentPercent = 0;
        
        const interval = setInterval(() => {
            currentPercent += Math.random() * 15;
            if (currentPercent >= 100) {
                clearInterval(interval);
                this.updateProgress(100);
                return;
            }
            this.updateProgress(currentPercent);
        }, 200);
    }

    updateProgress(percent) {
        this.percentElement.textContent = `${Math.floor(percent)}%`;
        this.progressBar.style.width = `${percent}%`;
    }

    finishLoading() {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(this.minimumDisplayTime - elapsedTime, 0);

        setTimeout(() => {
            this.preloader.classList.add('preloader--hidden');
            setTimeout(() => {
                this.preloader.remove();
            }, 1000);
        }, remainingTime);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new Preloader();
});
