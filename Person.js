class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movementProgressRemaining = 0;
    this.isStanding = false;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.movementProgressRemaining > 0) {
      this.updatePosition();
    } else {
      //more cases for starting to work will come later

      //case: keyboard ready and have arrow pressed
      if (
        state.map.isCutscenePlaying === false &&
        this.isPlayerControlled &&
        state.arrow
      ) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }

      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    //setting person direction to passed in behavior
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      //stop if space isn't free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);
        return;
      }
      //ready to walk!
      state.map.moveWall(this.x, this.y, this.direction);
      this.movementProgressRemaining = 16;
      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
        this.isStanding = false;
      }, behavior.time);
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movementProgressRemaining -= 1;

    if (this.movementProgressRemaining === 0) {
      //finished!
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
    }
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
