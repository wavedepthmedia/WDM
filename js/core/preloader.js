
export class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader');
    this.progressFill = document.querySelector('.progress-fill');
    this.percentDisplay = document.querySelector('.loading-percent');
    this.statusDisplay = document.querySelector('.loading-status');
    this.phrases = [
      'Загрузка аудио-движка...',
      'Инициализация DSP-эффектов...',
      'Подключение к стриминговому серверу...',
      'Кэширование медиа-контента...'
    ];
  }

  async load() {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * (15 - 5) + 5;
        if(progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(resolve, 500);
        }
        this.#updateProgress(progress);
      }, 300);
    });
  }

  #updateProgress(percent) {
    const currentPhrase = this.phrases[Math.floor(percent / 25)];
    this.statusDisplay.textContent = currentPhrase;
    this.progressFill.style.width = `${percent}%`;
    this.percentDisplay.textContent = `${Math.floor(percent)}%`;
  }

  async init() {
    await this.load();
    this.preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
                                     }
