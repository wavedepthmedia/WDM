export class MediaPlayer {
  constructor(playerSelector) {
    this.player = document.querySelector(playerSelector);
    this.audio = this.player.querySelector('audio');
    this.playBtn = this.player.querySelector('.play-btn');
    this.progress = this.player.querySelector('.progress');
    this.volume = this.player.querySelector('.volume');
    this.init();
  }

  togglePlay() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
    this.playBtn.classList.toggle('playing');
  }

  updateProgress() {
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.progress.style.width = `${percent}%`;
  }

  setProgress(e) {
    const width = this.progressContainer.offsetWidth;
    const clickX = e.offsetX;
    this.audio.currentTime = (clickX / width) * this.audio.duration;
  }

  handleVolume() {
    this.audio.volume = this.volume.value;
  }

  init() {
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.progressContainer.addEventListener('click', (e) => this.setProgress(e));
    this.volume.addEventListener('input', () => this.handleVolume());
    this.audio.addEventListener('ended', () => 
      this.playBtn.classList.remove('playing'));
  }
  }
