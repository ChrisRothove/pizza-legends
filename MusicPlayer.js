class MusicPlayer {
  constructor(config) {
    this.currentTuneId = config.tune;
    this.currentTune = Tunes[config.tune];
  }

  start() {
    this.currentTune.pause();
    this.currentTune = Tunes[this.currentTuneId];
    this.currentTune.autoplay = true;
    this.currentTune.loop = true;
    this.currentTune.muted = false;
    this.currentTune.volume = 0.5;
    this.currentTune.load();
  }

  changeTune(id) {
    if (!id) return this.currentTune.pause();
    if (id !== this.currentTuneId) {
      this.currentTuneId = id;
      this.currentTune.pause();
      this.start();
    }
  }

  pause() {
    this.currentTune.pause();
  }

  play() {
    this.currentTune.play();
  }
}
