window.MapMaker = {
  nullRoom: () => {
    return {
      id: "Empty Room",
      lowerSrc: "./../images/null.png",
      upperSrc: "./../images/null.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
      },
    };
  },
  // Master's Room
  mastersRoom: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(7),
      y: utils.withGrid(4),
    });
    const master = playerState.storyFlags["FIRST_DEFEAT"]
      ? {
          master: new Person({
            x: utils.withGrid(3),
            y: utils.withGrid(5),
            src: "./../images/characters/people/npc5.png",
          }),
        }
      : {
          master: new Person({
            x: utils.withGrid(3),
            y: utils.withGrid(5),
            src: "./../images/characters/people/npc5.png",
          }),
        };
    const erio = playerState.storyFlags["FIRST_DEFEAT"]
      ? {}
      : {
          erio: new Person({
            x: utils.withGrid(3),
            y: utils.withGrid(8),
            src: "./../images/characters/people/erio.png",
            talking: [{ events: Cutscenes[2].events }],
          }),
        };
    const transitionCutscene = playerState.storyFlags["FIRST_DEFEAT"]
      ? {}
      : { transitionCutscene: Cutscenes[1].events };
    return {
      id: "Master's Room",
      lowerSrc: "./../images/maps/DemoLower.png",
      upperSrc: "./../images/maps/DemoUpper.png",
      gameObjects: {
        hero,
        ...master,
        ...erio,
        pizzaStone: new PizzaStone({
          x: utils.withGrid(2),
          y: utils.withGrid(7),
          storyFlag: "USED_PIZZA_STONE",
          pizzas: playerState.recipes,
        }),
      },
      ...transitionCutscene,
      walls: {
        [utils.asGridCoords(7, 6)]: true,
        [utils.asGridCoords(8, 6)]: true,
        [utils.asGridCoords(7, 7)]: true,
        [utils.asGridCoords(8, 7)]: true,
        [utils.asGridCoords(1, 3)]: true,
        [utils.asGridCoords(0, 4)]: true,
        [utils.asGridCoords(0, 5)]: true,
        [utils.asGridCoords(0, 6)]: true,
        [utils.asGridCoords(0, 7)]: true,
        [utils.asGridCoords(0, 8)]: true,
        [utils.asGridCoords(0, 9)]: true,
        [utils.asGridCoords(0, 10)]: true,
        [utils.asGridCoords(1, 11)]: true,
        [utils.asGridCoords(2, 3)]: true,
        [utils.asGridCoords(3, 3)]: true,
        [utils.asGridCoords(4, 3)]: true,
        [utils.asGridCoords(5, 3)]: true,
        [utils.asGridCoords(6, 4)]: true,
        [utils.asGridCoords(8, 4)]: true,
        [utils.asGridCoords(9, 3)]: true,
        [utils.asGridCoords(10, 3)]: true,
        [utils.asGridCoords(11, 4)]: true,
        [utils.asGridCoords(11, 5)]: true,
        [utils.asGridCoords(11, 6)]: true,
        [utils.asGridCoords(11, 7)]: true,
        [utils.asGridCoords(11, 8)]: true,
        [utils.asGridCoords(11, 9)]: true,
        [utils.asGridCoords(11, 10)]: true,
        [utils.asGridCoords(2, 10)]: true,
        [utils.asGridCoords(3, 10)]: true,
        [utils.asGridCoords(4, 10)]: true,
        [utils.asGridCoords(6, 10)]: true,
        [utils.asGridCoords(7, 10)]: true,
        [utils.asGridCoords(8, 10)]: true,
        [utils.asGridCoords(9, 10)]: true,
        [utils.asGridCoords(3, 7)]: true,
        [utils.asGridCoords(5, 12)]: true,
      },
    };
  },
};
