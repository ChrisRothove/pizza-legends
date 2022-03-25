class DirectionInput {
  constructor() {
    this.heldDirection = [];

    this.map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",

      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
    };

    this.keyUpEvent = (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirection.indexOf(dir);
      if (index > -1) {
        this.heldDirection.splice(index, 1);
      }
    };
    this.keyDownEvent = (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirection.indexOf(dir) === -1) {
        this.heldDirection.unshift(dir);
      }
    };
  }

  get direction() {
    return this.heldDirection[0];
  }

  reMap() {
    this.map = playerState.directions;
    document.removeEventListener("keyup", this.keyUpEvent);
    document.removeEventListener("keydown", this.keyDownEvent);
    this.init();
  }

  init() {
    document.addEventListener("keydown", this.keyDownEvent);
    document.addEventListener("keyup", this.keyUpEvent);
  }
}
