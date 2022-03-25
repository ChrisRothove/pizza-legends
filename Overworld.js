class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // establish camera person
      const cameraPerson = this.map.gameObjects.hero;

      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // Draw Lower Map
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // draw game objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      //draw upper map
      this.map.drawUpperImage(this.ctx, cameraPerson);

      if (!this.map.isPaused) {
        requestAnimationFrame(() => {
          step();
        });
      }
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //is there anything here?
      this.map.checkForActionCutscene();
    });
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{ type: "pause" }]);
      }
    });
  }

  bindHeroPosition() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig, heroInitialState = null) {
    this.map = new OverworldMap(mapConfig);
    console.log(this.map);
    this.map.overworld = this;
    this.map.mountObjects();

    if (heroInitialState) {
      const { hero } = this.map.gameObjects;
      this.map.removeWall(hero.x, hero.y);
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
      this.map.addWall(hero.x, hero.y);
    }

    this.progress.mapId = mapConfig.id;
    this.progress.startingHeroX = this.map.gameObjects.hero.x;
    this.progress.startingHeroY = this.map.gameObjects.hero.y;
    this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
    this.map.transitionCutscene &&
      this.map.startCutscene(this.map.transitionCutscene);
  }

  async init() {
    const container = document.querySelector(".game-container");

    // create new progress tracker
    this.progress = new Progress();

    //show title screen
    this.titleScreen = new TitleScreen({
      progress: this.progress,
    });
    const useSaveFile = await this.titleScreen.init(container);

    //check for and load saved data
    let initialHeroState = null;
    if (useSaveFile) {
      this.progress.load();
      initialHeroState = {
        x: this.progress.startingHeroX,
        y: this.progress.startingHeroY,
        direction: this.progress.startingHeroDirection,
      };
    }

    //load the Hud
    this.hud = new Hud();
    this.hud.init(container);

    //start the first map
    this.startMap(window.MapMaker[this.progress.mapId](), initialHeroState);

    //Create Controlls
    this.bindActionInput();
    this.bindHeroPosition();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    // Kick off the game!
    this.startGameLoop();

    this.map.startCutscene(Cutscenes[0].events);
  }
}
