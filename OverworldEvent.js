class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );
    // setup event handler for when a person is done walking, then resolve event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };

    document.addEventListener("PersonStandComplete", completeHandler);
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: "walk",
        direction: this.event.direction,
        retry: this.event.retry || true,
      }
    );
    // setup event handler for when a person is done walking, then resolve event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };

    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(
        this.map.gameObjects["hero"].direction
      );
    }
    const message = new TextMessage({
      text: this.event.text,
      speaker: this.event.speaker,
      name: this.event.name,
      onComplete: () => resolve(),
    });
    message.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap(window.MapMaker[this.event.map](), {
        x: this.event.x,
        y: this.event.y,
        direction: this.event.direction,
      });
      resolve();

      sceneTransition.fadeOut();
    });
  }

  battle(resolve) {
    if (Object.keys(playerState.pizzas).length > 0) {
      const prevMusic = this.map.overworld.musicPlayer.currentTuneId;
      this.map.overworld.musicPlayer.changeTune(this.event.bgm);
      const { canLose } = this.event;
      const battle = new Battle({
        enemy: enemies[this.event.enemyId],
        onComplete: (didWin) => {
          resolve(didWin || canLose ? "WON_BATTLE" : "LOST_BATTLE");
          this.map.overworld.musicPlayer.changeTune(prevMusic);
        },
      });
      battle.init(document.querySelector(".game-container"));
    } else {
      const message = new TextMessage({
        text: "You don't have any Pizzas...",
        onComplete: () => resolve("NO_PIZZAS"),
      });
      message.init(document.querySelector(".game-container"));
    }
  }

  pause(resolve) {
    this.map.overworld.musicPlayer.pause();
    this.map.isPaused = true;
    const menu = new PauseMenu({
      progress: this.map.overworld.progress,
      onComplete: () => {
        resolve();
        this.map.overworld.musicPlayer.play();
        this.map.isPaused = false;
        this.map.overworld.startGameLoop();
      },
    });
    menu.init(document.querySelector(".game-container"));
  }

  addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
    resolve();
  }

  craftingMenu(resolve) {
    const menu = new CraftingMenu({
      pizzas: this.event.pizzas,
      onComplete: () => {
        resolve();
      },
    });
    menu.init(document.querySelector(".game-container"));
  }

  openShop(resolve) {
    this.map.isPaused = true;
    const menu = new ShopMenu({
      list: this.event.list || "items",
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
        this.map.overworld.startGameLoop();
      },
    });
    menu.init(document.querySelector(".game-container"));
  }

  useItem(resolve) {
    console.log("this fires", this.event);
    const { target, recover } = this.event;
    if (recover) {
      let newHp = (target.hp += recover);
      if (target.maxHp < newHp) {
        newHp = target.maxHp;
      }
      target.hp = newHp;
      utils.emitEvent("LineupChanged");
    }
    resolve();
  }

  removeObject(resolve) {
    console.log(this);
    const { who } = this.event;
    const person = this.map.gameObjects[who];
    delete this.map.removeWall(person.x, person.y);
    delete this.map.gameObjects[who];
    resolve();
  }

  updateStoryValue(resolve) {
    const { flag } = this.event;
    const state = playerState.storyFlags[flag];
    state
      ? (playerState.storyFlags[flag] += 1)
      : (playerState.storyFlags[flag] = 1);
    resolve();
  }

  itemGet(resolve) {
    const { items } = this.event;
    if (items) {
      items.forEach((item) => {
        playerState.items.push({
          actionId: item,
          instanceId: `item${new Date()}`,
        });
      });
    }
    resolve();
  }

  ingredientGet(resolve) {
    const { items } = this.event;
    if (items) {
      items.forEach((item) => {
        playerState.ingredients.push({
          indexId: item,
          instanceId: `item${new Date()}`,
        });
      });
    }
    resolve();
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}
