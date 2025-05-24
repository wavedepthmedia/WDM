export class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader');
    this.progressBar = document.querySelector('.progress-fill');
    this.percentDisplay = document.querySelector('.loading-percent');
    this.statusDisplay = document.querySelector('.loading-status');
    
    this.phrases = [
      'Инициализация аудио системы...',
      'Загрузка графических ресурсов...',
      'Подключение к базе данных...',
      'Оптимизация производительности...'
    ];
  }

  loadResources() {
    return new Promise((resolve) => {
      const resources = [
        '/shared/header.html',
        '/shared/footer.html',
        '/css/main.css',
        '/assets/images/logo.svg'
      ];

      let loaded = 0;
      const total = resources.length;

      resources.forEach(url => {
        fetch(url)
          .then(() => {
            loaded++;
            this.updateProgress((loaded/total)*100);
            if(loaded === total) resolve();
          })
          .catch(() => {
            loaded++;
            if(loaded === total) resolve();
          });
      });
    });
  }

  updateProgress(percent) {
    const currentPhrase = this.phrases[Math.floor(percent/25)];
    this.statusDisplay.textContent = currentPhrase;
    this.progressBar.style.width = `${percent}%`;
    this.percentDisplay.textContent = `${Math.floor(percent)}%`;
  }

  async init() {
    await this.loadResources();
    
    // Добавляем небольшую задержку для плавности
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.preloader.classList.add('loaded');
    document.body.classList.add('loaded');
    
    // Удаляем прелоадер из DOM через 1 секунду
    setTimeout(() => {
      this.preloader.remove();
    }, 1000);
  }
}
