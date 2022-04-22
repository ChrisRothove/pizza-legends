class MusicPlayer {
  constructor(config) {
    this.currentTuneId = config.tune;
  }

  start() {
    this.currentTune = Tunes[this.currentTuneId];
    this.currentTune.autoplay = true;
    this.currentTune.loop = true;
    this.currentTune.muted = false;
    this.currentTune.load();
  }

  changeTune(id) {
    if (id !== this.currentTuneId) {
      this.currentTuneId = id;
      this.currentTune.pause();
      this.setTune();
    }
  }

  pause() {
    this.currentTune.pause();
  }

  play() {
    this.currentTune.play();
  }
}
