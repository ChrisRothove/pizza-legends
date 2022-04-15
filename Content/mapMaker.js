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
      id: "mastersRoom",
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
        [utils.asGridCoords(5, 12)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(5, 10)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "city",
                x: utils.withGrid(4),
                y: utils.withGrid(11),
                direction: "right",
              },
            ],
          },
        ],
      },
    };
  },
  // LITTLE CHEF BIG CITYYYY
  city: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    const transitionCutscene = {};

    return {
      id: "city",
      lowerSrc: "./../images/maps/StreetLower.png",
      upperSrc: "./../images/maps/StreetUpper.png",
      gameObjects: { hero },
      ...transitionCutscene,
      walls: {
        [utils.asGridCoords(3, 10)]: true,
        [utils.asGridCoords(3, 11)]: true,
        [utils.asGridCoords(3, 12)]: true,
        [utils.asGridCoords(3, 13)]: true,
        [utils.asGridCoords(4, 9)]: true,
        [utils.asGridCoords(6, 9)]: true,
        [utils.asGridCoords(7, 9)]: true,
        [utils.asGridCoords(8, 9)]: true,
        [utils.asGridCoords(9, 9)]: true,
        [utils.asGridCoords(10, 9)]: true,
        [utils.asGridCoords(11, 9)]: true,
        [utils.asGridCoords(12, 9)]: true,
        [utils.asGridCoords(13, 8)]: true,
        [utils.asGridCoords(14, 8)]: true,
        [utils.asGridCoords(15, 7)]: true,
        [utils.asGridCoords(16, 7)]: true,
        [utils.asGridCoords(17, 7)]: true,
        [utils.asGridCoords(18, 7)]: true,
        [utils.asGridCoords(19, 7)]: true,
        [utils.asGridCoords(20, 7)]: true,
        [utils.asGridCoords(21, 7)]: true,
        [utils.asGridCoords(22, 7)]: true,
        [utils.asGridCoords(23, 7)]: true,
        [utils.asGridCoords(24, 7)]: true,
        [utils.asGridCoords(26, 7)]: true,
        [utils.asGridCoords(27, 7)]: true,
        [utils.asGridCoords(28, 8)]: true,
        [utils.asGridCoords(28, 9)]: true,
        [utils.asGridCoords(30, 9)]: true,
        [utils.asGridCoords(31, 9)]: true,
        [utils.asGridCoords(32, 9)]: true,
        [utils.asGridCoords(33, 9)]: true,
        [utils.asGridCoords(34, 10)]: true,
        [utils.asGridCoords(34, 11)]: true,
        [utils.asGridCoords(34, 12)]: true,
        [utils.asGridCoords(34, 13)]: true,
        [utils.asGridCoords(33, 14)]: true,
        [utils.asGridCoords(32, 14)]: true,
        [utils.asGridCoords(31, 14)]: true,
        [utils.asGridCoords(30, 14)]: true,
        [utils.asGridCoords(29, 14)]: true,
        [utils.asGridCoords(28, 14)]: true,
        [utils.asGridCoords(27, 14)]: true,
        [utils.asGridCoords(26, 14)]: true,
        [utils.asGridCoords(25, 14)]: true,
        [utils.asGridCoords(24, 14)]: true,
        [utils.asGridCoords(23, 14)]: true,
        [utils.asGridCoords(22, 14)]: true,
        [utils.asGridCoords(21, 14)]: true,
        [utils.asGridCoords(20, 14)]: true,
        [utils.asGridCoords(19, 14)]: true,
        [utils.asGridCoords(18, 14)]: true,
        [utils.asGridCoords(17, 14)]: true,
        [utils.asGridCoords(16, 14)]: true,
        [utils.asGridCoords(15, 14)]: true,
        [utils.asGridCoords(14, 14)]: true,
        [utils.asGridCoords(13, 14)]: true,
        [utils.asGridCoords(12, 14)]: true,
        [utils.asGridCoords(11, 14)]: true,
        [utils.asGridCoords(10, 14)]: true,
        [utils.asGridCoords(9, 14)]: true,
        [utils.asGridCoords(8, 14)]: true,
        [utils.asGridCoords(7, 14)]: true,
        [utils.asGridCoords(6, 14)]: true,
        [utils.asGridCoords(5, 14)]: true,
        [utils.asGridCoords(4, 14)]: true,
        [utils.asGridCoords(24, 6)]: true,
        [utils.asGridCoords(24, 5)]: true,
        [utils.asGridCoords(26, 6)]: true,
        [utils.asGridCoords(26, 5)]: true,
      },
    };
  },
};
