export class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader');
    this.progressBar = this.preloader?.querySelector('.progress__bar');
    this.progressText = this.preloader?.querySelector('.progress__text');
    this.statusText = this.preloader?.querySelector('.status__text');
    
    this.phrases = [
      'Оптимизация аудио-кодека',
      'Инициализация DSP-процессоров',
      'Загрузка графических ресурсов',
      'Подключение к API сервера'
    ];
  }

  async init() {
    if (!this.preloader) return;
    
    try {
      await this.loadCriticalResources();
      await this.simulateProgress();
      this.hidePreloader();
    } catch (error) {
      console.error('Preloader error:', error);
      this.hidePreloader();
    }
  }

  async loadCriticalResources() {
    const criticalResources = [
      '/css/main.css',
      '/shared/header.html',
      '/shared/footer.html'
    ];

    return Promise.allSettled(
      criticalResources.map(url => fetch(url))
    );
  }

  async simulateProgress() {
    return new Promise(resolve => {
      let progress = 0;
      
      const update = () => {
        progress += Math.random() * 3 + 2;
        progress = Math.min(progress, 100);
        
        this.updateProgress(progress);
        
        if (progress < 100) {
          setTimeout(update, 100 + Math.random() * 200);
        } else {
          resolve();
        }
      };
      
      update();
    });
  }

  updateProgress(percent) {
    const phraseIndex = Math.floor((percent / 100) * this.phrases.length);
    const currentPhrase = this.phrases[phraseIndex] || 'Завершение инициализации';
    
    if (this.progressBar) {
      this.progressBar.style.width = `${percent}%`;
    }
    
    if (this.progressText) {
      this.progressText.textContent = `${Math.floor(percent)}%`;
    }
    
    if (this.statusText) {
      this.statusText.textContent = `${currentPhrase}...`;
    }
  }

  hidePreloader() {
    this.preloader.style.opacity = '0';
    setTimeout(() => {
      this.preloader.remove();
    }, 500);
  }
}
