class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader');
    this.progressBar = document.querySelector('.progress-fill');
    this.percentDisplay = document.querySelector('.loading-percent');
    this.loadStatus = 0;
  }

  simulateLoading() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        this.loadStatus += Math.random() * 15;
        if(this.loadStatus >= 100) {
          this.loadStatus = 100;
          clearInterval(interval);
          resolve();
        }
        this.updateProgress();
      }, 300);
    });
  }

  updateProgress() {
    this.progressBar.style.width = `${this.loadStatus}%`;
    this.percentDisplay.textContent = `${Math.floor(this.loadStatus)}%`;
  }

  hidePreloader() {
    this.preloader.style.opacity = '0';
    setTimeout(() => {
      this.preloader.style.display = 'none';
    }, 500);
  }

  async init() {
    await this.simulateLoading();
    this.hidePreloader();
  }
}

export default Preloader;
