window.MapMaker = {
  nullRoom: () => {
    return {
      id: "Empty Room",
      lowerSrc: "./../images/null.png",
      upperSrc: "./../images/null.png",
      theme: "erio",
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

    // MASTER
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
            x: utils.withGrid(5),
            y: utils.withGrid(5),
            src: "./../images/characters/people/npc5.png",
          }),
        };

    // ERIO
    const erio = playerState.storyFlags["FIRST_DEFEAT"]
      ? {}
      : {
          erio: new Person({
            x: utils.withGrid(5),
            y: utils.withGrid(9),
            src: "./../images/characters/people/erio.png",
            talking: [{ events: Cutscenes[2].events }],
          }),
        };

    // TRANSITION SCENE
    const transitionCutscene = playerState.storyFlags["FIRST_DEFEAT"]
      ? {}
      : { transitionCutscene: Cutscenes[1].events };

    // MUSIC
    const theme = playerState.storyFlags["FIRST_DEFEAT"] ? "learning" : "erio";

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
          pizzas: playerState.recipes,
        }),
      },
      ...transitionCutscene,
      theme,
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
    // SET DEFAULTS
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    let transitionCutscene = {};
    let gameObjects = {};
    const theme = "town";

    switch (playerState.storyFlags["CITY_STATE"]) {
      case 1: 
        gameObjects.guy1 = new Person({
          x: utils.withGrid(16),
          y: utils.withGrid(8),
          src: "/images/characters/people/npc2.png",
        })
        gameObjects.guy2 = new Person({
          x: utils.withGrid(18),
          y: utils.withGrid(8),
          src: "/images/characters/people/npc2.png",
        })
        gameObjects.guy3 = new Person({
          x: utils.withGrid(19),
          y: utils.withGrid(8),
          src: "/images/characters/people/npc2.png",
        })
        gameObjects.guy4 = new Person({
          x: utils.withGrid(20),
          y: utils.withGrid(8),
          src: "/images/characters/people/npc2.png",
        })
        gameObjects.guy5 = new Person({
          x: utils.withGrid(24),
          y: utils.withGrid(8),
          src: "/images/characters/people/npc2.png",
        })
        gameObjects.guy6 = new Person({
          x: utils.withGrid(18),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })
        gameObjects.guy7 = new Person({
          x: utils.withGrid(19),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })
        gameObjects.guy8 = new Person({
          x: utils.withGrid(20),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })
        gameObjects.guy9 = new Person({
          x: utils.withGrid(21),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })
        gameObjects.guy10 = new Person({
          x: utils.withGrid(22),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })
        gameObjects.guy11 = new Person({
          x: utils.withGrid(23),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })
        gameObjects.guy12 = new Person({
          x: utils.withGrid(24),
          y: utils.withGrid(12),
          src: "/images/characters/people/npc2.png",
          direction: "up"
        })

        gameObjects.beth = new Person({
          x: utils.withGrid(19),
          y: utils.withGrid(9),
          src: "/images/characters/people/npc1.png",
          direction: "right"
        })
        gameObjects.bethPizza = new Person({
          x: utils.withGrid(20),
          y: utils.withGrid(10),
          src: "/images/characters/pizzas/f001.png"
        })

        gameObjects.baddie = new Person({
          x: utils.withGrid(22),
          y: utils.withGrid(11),
          src: "/images/characters/people/npc2.png",
          direction: "left"
        })
        gameObjects.baddiePizza = new Person({
          x: utils.withGrid(21),
          y: utils.withGrid(10),
          src: "/images/characters/pizzas/n002.png"
        })

        gameObjects.paprika = new Person({
          x: utils.withGrid(20),
          y: utils.withGrid(13),
          src: "/images/characters/people/npc4.png",
          direction: "up",
          talking: [
            {
              events: window.Cutscenes[3].events
            }
          ]
        })
      default:
          gameObjects.benson = new Person({
            x: utils.withGrid(13),
            y: utils.withGrid(9),
            src: "/images/characters/people/npc2.png",
            behaviorLoop: null,
            talking: [
              {
                events: [
                  {
                    type: "textMessage",
                    text: "Oh, you're the Master's new apprentice, right?",
                    speaker: "npc2",
                    name: "benson",
                    faceHero: "benson"
                  },
                  {
                    type: "textMessage",
                    text: "Work hard, okay? He needs the win.",
                    speaker: "npc2",
                    name: "benson",
                  },
                  {type: "stand", direction: "down"}
                ],
              },
            ],
          })
          gameObjects.riley = new Person({
            x: utils.withGrid(17),
            y: utils.withGrid(12),
            src: "/images/characters/people/npc2.png",
            behaviorLoop: null,
            talking: [
              {
                events: [
                  {
                    type: "textMessage",
                    text: "These red boxes are for challenging strangers to a Pizza Fight. Just walk around.",
                    speaker: "npc2",
                    name: "Riley",
                    faceHero: "riley"
                  },
                  {type: "stand", direction: "down"}
                ],
              },
            ],
          })
          gameObjects.javier = new Person({
            x: utils.withGrid(32),
            y: utils.withGrid(12),
            src: "/images/characters/people/npc2.png",
            behaviorLoop: null,
            talking: [
              {
                events: [
                  {
                    type: "textMessage",
                    text: "I didn't expect it at all...",
                    speaker: "npc2",
                    name: "Javier",
                  },
                ],
              },
            ],
          }),
    }

    return {
      id: "city",
      lowerSrc: "./../images/maps/StreetLower.png",
      upperSrc: "./../images/maps/StreetUpper.png",
      gameObjects: { hero, ...gameObjects },
      ...transitionCutscene,
      theme,
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
        [utils.asGridCoords(16, 9)]: true,
        [utils.asGridCoords(17, 9)]: true,
        [utils.asGridCoords(16, 10)]: true,
        [utils.asGridCoords(17, 10)]: true,
        [utils.asGridCoords(16, 11)]: true,
        [utils.asGridCoords(17, 11)]: true,
        [utils.asGridCoords(25, 9)]: true,
        [utils.asGridCoords(26, 9)]: true,
        [utils.asGridCoords(25, 10)]: true,
        [utils.asGridCoords(26, 10)]: true,
        [utils.asGridCoords(25, 11)]: true,
        [utils.asGridCoords(26, 11)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(25, 6)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "upperCity",
                x: utils.withGrid(7),
                y: utils.withGrid(16),
                direction: "up",
              },
            ],
          },
        ],
        [utils.asGridCoords(5, 9)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "shop",
                x: utils.withGrid(5),
                y: utils.withGrid(12),
                direction: "up",
              },
            ],
          },
        ],
        [utils.asGridCoords(29, 9)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "stack",
                x: utils.withGrid(5),
                y: utils.withGrid(10),
                direction: "up",
              },
            ],
          },
        ],
      },
    };
  },
  // Shop Time
  shop: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    const transitionCutscene = {};

    const theme = "town";

    return {
      id: "shop",
      lowerSrc: "./../images/maps/PizzaShopLower.png",
      upperSrc: "./../images/maps/PizzaShopUpper.png",
      gameObjects: { hero },
      ...transitionCutscene,
      theme,
      walls: {
        [utils.asGridCoords(1, 3)]: true,
        [utils.asGridCoords(0, 4)]: true,
        [utils.asGridCoords(0, 5)]: true,
        [utils.asGridCoords(0, 6)]: true,
        [utils.asGridCoords(0, 7)]: true,
        [utils.asGridCoords(0, 8)]: true,
        [utils.asGridCoords(0, 9)]: true,
        [utils.asGridCoords(0, 10)]: true,
        [utils.asGridCoords(0, 11)]: true,
        [utils.asGridCoords(1, 12)]: true,
        [utils.asGridCoords(2, 12)]: true,
        [utils.asGridCoords(3, 12)]: true,
        [utils.asGridCoords(4, 12)]: true,
        [utils.asGridCoords(6, 12)]: true,
        [utils.asGridCoords(7, 12)]: true,
        [utils.asGridCoords(8, 12)]: true,
        [utils.asGridCoords(9, 12)]: true,
        [utils.asGridCoords(10, 12)]: true,
        [utils.asGridCoords(11, 11)]: true,
        [utils.asGridCoords(11, 10)]: true,
        [utils.asGridCoords(11, 9)]: true,
        [utils.asGridCoords(11, 8)]: true,
        [utils.asGridCoords(11, 7)]: true,
        [utils.asGridCoords(11, 6)]: true,
        [utils.asGridCoords(11, 5)]: true,
        [utils.asGridCoords(11, 4)]: true,
        [utils.asGridCoords(10, 3)]: true,
        [utils.asGridCoords(9, 3)]: true,
        [utils.asGridCoords(8, 3)]: true,
        [utils.asGridCoords(7, 3)]: true,
        [utils.asGridCoords(6, 3)]: true,
        [utils.asGridCoords(5, 3)]: true,
        [utils.asGridCoords(4, 3)]: true,
        [utils.asGridCoords(3, 3)]: true,
        [utils.asGridCoords(2, 3)]: true,
        [utils.asGridCoords(2, 4)]: true,
        [utils.asGridCoords(2, 5)]: true,
        [utils.asGridCoords(2, 6)]: true,
        [utils.asGridCoords(3, 6)]: true,
        [utils.asGridCoords(4, 6)]: true,
        [utils.asGridCoords(5, 6)]: true,
        [utils.asGridCoords(7, 6)]: true,
        [utils.asGridCoords(8, 6)]: true,
        [utils.asGridCoords(9, 6)]: true,
        [utils.asGridCoords(9, 5)]: true,
        [utils.asGridCoords(9, 4)]: true,
        [utils.asGridCoords(3, 8)]: true,
        [utils.asGridCoords(4, 8)]: true,
        [utils.asGridCoords(3, 9)]: true,
        [utils.asGridCoords(4, 9)]: true,
        [utils.asGridCoords(3, 10)]: true,
        [utils.asGridCoords(4, 10)]: true,
        [utils.asGridCoords(7, 8)]: true,
        [utils.asGridCoords(8, 8)]: true,
        [utils.asGridCoords(7, 9)]: true,
        [utils.asGridCoords(8, 9)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(5, 12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "city",
                x: utils.withGrid(5),
                y: utils.withGrid(9),
                direction: "down",
              },
            ],
          },
        ],
      },
    };
  },
  // The Stack
  stack: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    const transitionCutscene = {};

    const theme = "town";

    return {
      id: "stack",
      lowerSrc: "./../images/maps/KitchenLower.png",
      upperSrc: "./../images/maps/KitchenUpper.png",
      gameObjects: { hero },
      ...transitionCutscene,
      theme,
      walls: {
        [utils.asGridCoords(2, 4)]: true,
        [utils.asGridCoords(3, 4)]: true,
        [utils.asGridCoords(4, 3)]: true,
        [utils.asGridCoords(5, 4)]: true,
        [utils.asGridCoords(6, 4)]: true,
        [utils.asGridCoords(7, 4)]: true,
        [utils.asGridCoords(8, 4)]: true,
        [utils.asGridCoords(9, 4)]: true,
        [utils.asGridCoords(10, 4)]: true,
        [utils.asGridCoords(11, 5)]: true,
        [utils.asGridCoords(12, 5)]: true,
        [utils.asGridCoords(13, 6)]: true,
        [utils.asGridCoords(13, 7)]: true,
        [utils.asGridCoords(13, 8)]: true,
        [utils.asGridCoords(13, 9)]: true,
        [utils.asGridCoords(12, 10)]: true,
        [utils.asGridCoords(11, 10)]: true,
        [utils.asGridCoords(10, 10)]: true,
        [utils.asGridCoords(9, 10)]: true,
        [utils.asGridCoords(8, 10)]: true,
        [utils.asGridCoords(7, 10)]: true,
        [utils.asGridCoords(6, 10)]: true,
        [utils.asGridCoords(4, 10)]: true,
        [utils.asGridCoords(3, 10)]: true,
        [utils.asGridCoords(2, 10)]: true,
        [utils.asGridCoords(2, 9)]: true,
        [utils.asGridCoords(1, 9)]: true,
        [utils.asGridCoords(0, 8)]: true,
        [utils.asGridCoords(1, 7)]: true,
        [utils.asGridCoords(1, 6)]: true,
        [utils.asGridCoords(1, 5)]: true,
        [utils.asGridCoords(6, 7)]: true,
        [utils.asGridCoords(7, 7)]: true,
        [utils.asGridCoords(9, 7)]: true,
        [utils.asGridCoords(10, 7)]: true,
        [utils.asGridCoords(9, 9)]: true,
        [utils.asGridCoords(10, 9)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(5, 10)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "city",
                x: utils.withGrid(29),
                y: utils.withGrid(9),
                direction: "down",
              },
            ],
          },
        ],
      },
    };
  },
  // Upper City
  upperCity: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    const transitionCutscene = {};

    const theme = "upperTown";

    return {
      id: "upperCity",
      lowerSrc: "./../images/maps/StreetNorthLower.png",
      upperSrc: "./../images/maps/StreetNorthUpper.png",
      gameObjects: { hero },
      ...transitionCutscene,
      theme,
      walls: {
        [utils.asGridCoords(2, 15)]: true,
        [utils.asGridCoords(3, 15)]: true,
        [utils.asGridCoords(4, 15)]: true,
        [utils.asGridCoords(5, 15)]: true,
        [utils.asGridCoords(6, 15)]: true,
        [utils.asGridCoords(8, 15)]: true,
        [utils.asGridCoords(9, 15)]: true,
        [utils.asGridCoords(10, 15)]: true,
        [utils.asGridCoords(11, 15)]: true,
        [utils.asGridCoords(12, 15)]: true,
        [utils.asGridCoords(13, 15)]: true,
        [utils.asGridCoords(14, 15)]: true,
        [utils.asGridCoords(7, 17)]: true,
        [utils.asGridCoords(1, 8)]: true,
        [utils.asGridCoords(1, 9)]: true,
        [utils.asGridCoords(1, 10)]: true,
        [utils.asGridCoords(1, 11)]: true,
        [utils.asGridCoords(1, 12)]: true,
        [utils.asGridCoords(1, 13)]: true,
        [utils.asGridCoords(1, 14)]: true,
        [utils.asGridCoords(1, 15)]: true,
        [utils.asGridCoords(2, 7)]: true,
        [utils.asGridCoords(3, 7)]: true,
        [utils.asGridCoords(3, 6)]: true,
        [utils.asGridCoords(4, 5)]: true,
        [utils.asGridCoords(5, 5)]: true,
        [utils.asGridCoords(6, 5)]: true,
        [utils.asGridCoords(8, 5)]: true,
        [utils.asGridCoords(9, 5)]: true,
        [utils.asGridCoords(10, 5)]: true,
        [utils.asGridCoords(11, 6)]: true,
        [utils.asGridCoords(12, 6)]: true,
        [utils.asGridCoords(13, 6)]: true,
        [utils.asGridCoords(14, 7)]: true,
        [utils.asGridCoords(14, 8)]: true,
        [utils.asGridCoords(14, 9)]: true,
        [utils.asGridCoords(14, 10)]: true,
        [utils.asGridCoords(14, 11)]: true,
        [utils.asGridCoords(14, 12)]: true,
        [utils.asGridCoords(14, 13)]: true,
        [utils.asGridCoords(14, 14)]: true,
        [utils.asGridCoords(14, 15)]: true,
        [utils.asGridCoords(8, 4)]: true,
        [utils.asGridCoords(6, 16)]: true,
        [utils.asGridCoords(8, 16)]: true,
        [utils.asGridCoords(7, 8)]: true,
        [utils.asGridCoords(8, 8)]: true,
        [utils.asGridCoords(7, 9)]: true,
        [utils.asGridCoords(8, 9)]: true,
        [utils.asGridCoords(7, 10)]: true,
        [utils.asGridCoords(8, 10)]: true,
        [utils.asGridCoords(9, 10)]: true,
        [utils.asGridCoords(10, 10)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(7, 16)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "city",
                x: utils.withGrid(25),
                y: utils.withGrid(6),
                direction: "down",
              },
            ],
          },
        ],
        [utils.asGridCoords(7, 5)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "dining",
                x: utils.withGrid(6),
                y: utils.withGrid(12),
                direction: "up",
              },
            ],
          },
        ],
      },
    };
  },
  //Dining Room
  dining: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    const transitionCutscene = {};

    const theme = "upperTown";

    return {
      id: "dining",
      lowerSrc: "./../images/maps/DiningRoomLower.png",
      upperSrc: "./../images/maps/DiningRoomUpper.png",
      gameObjects: { hero },
      ...transitionCutscene,
      theme,
      walls: {
        [utils.asGridCoords(1, 3)]: true,
        [utils.asGridCoords(0, 4)]: true,
        [utils.asGridCoords(0, 5)]: true,
        [utils.asGridCoords(0, 6)]: true,
        [utils.asGridCoords(0, 7)]: true,
        [utils.asGridCoords(0, 8)]: true,
        [utils.asGridCoords(0, 9)]: true,
        [utils.asGridCoords(0, 10)]: true,
        [utils.asGridCoords(0, 11)]: true,
        [utils.asGridCoords(1, 12)]: true,
        [utils.asGridCoords(2, 12)]: true,
        [utils.asGridCoords(3, 12)]: true,
        [utils.asGridCoords(4, 12)]: true,
        [utils.asGridCoords(5, 12)]: true,
        [utils.asGridCoords(7, 12)]: true,
        [utils.asGridCoords(8, 12)]: true,
        [utils.asGridCoords(9, 12)]: true,
        [utils.asGridCoords(10, 12)]: true,
        [utils.asGridCoords(11, 12)]: true,
        [utils.asGridCoords(12, 12)]: true,
        [utils.asGridCoords(13, 11)]: true,
        [utils.asGridCoords(13, 10)]: true,
        [utils.asGridCoords(13, 9)]: true,
        [utils.asGridCoords(13, 8)]: true,
        [utils.asGridCoords(13, 7)]: true,
        [utils.asGridCoords(13, 6)]: true,
        [utils.asGridCoords(13, 5)]: true,
        [utils.asGridCoords(12, 5)]: true,
        [utils.asGridCoords(11, 5)]: true,
        [utils.asGridCoords(10, 5)]: true,
        [utils.asGridCoords(9, 4)]: true,
        [utils.asGridCoords(8, 3)]: true,
        [utils.asGridCoords(7, 2)]: true,
        [utils.asGridCoords(6, 3)]: true,
        [utils.asGridCoords(5, 3)]: true,
        [utils.asGridCoords(4, 3)]: true,
        [utils.asGridCoords(3, 3)]: true,
        [utils.asGridCoords(2, 3)]: true,
        [utils.asGridCoords(1, 3)]: true,
        [utils.asGridCoords(1, 5)]: true,
        [utils.asGridCoords(2, 5)]: true,
        [utils.asGridCoords(3, 5)]: true,
        [utils.asGridCoords(4, 5)]: true,
        [utils.asGridCoords(6, 5)]: true,
        [utils.asGridCoords(6, 4)]: true,
        [utils.asGridCoords(2, 7)]: true,
        [utils.asGridCoords(3, 7)]: true,
        [utils.asGridCoords(4, 7)]: true,
        [utils.asGridCoords(7, 7)]: true,
        [utils.asGridCoords(8, 7)]: true,
        [utils.asGridCoords(9, 7)]: true,
        [utils.asGridCoords(11, 7)]: true,
        [utils.asGridCoords(12, 7)]: true,
        [utils.asGridCoords(2, 10)]: true,
        [utils.asGridCoords(3, 10)]: true,
        [utils.asGridCoords(4, 10)]: true,
        [utils.asGridCoords(7, 10)]: true,
        [utils.asGridCoords(8, 10)]: true,
        [utils.asGridCoords(9, 10)]: true,
        [utils.asGridCoords(6, 13)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(7, 3)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "finale",
                x: utils.withGrid(5),
                y: utils.withGrid(12),
                direction: "up",
              },
            ],
          },
        ],
        [utils.asGridCoords(6, 12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "upperCity",
                x: utils.withGrid(7),
                y: utils.withGrid(5),
                direction: "down",
              },
            ],
          },
        ],
      },
    };
  },
  //Finale Room
  finale: () => {
    const hero = new Person({
      isPlayerControlled: true,
      x: utils.withGrid(4),
      y: utils.withGrid(11),
    });
    const transitionCutscene = {};

    const theme = "erio";

    return {
      id: "finale",
      lowerSrc: "./../images/maps/GreenKitchenLower.png",
      upperSrc: "./../images/maps/GreenKitchenUpper.png",
      gameObjects: { hero },
      ...transitionCutscene,
      theme,
      walls: {
        [utils.asGridCoords(1, 3)]: true,
        [utils.asGridCoords(2, 3)]: true,
        [utils.asGridCoords(3, 3)]: true,
        [utils.asGridCoords(4, 3)]: true,
        [utils.asGridCoords(5, 3)]: true,
        [utils.asGridCoords(6, 3)]: true,
        [utils.asGridCoords(7, 3)]: true,
        [utils.asGridCoords(8, 4)]: true,
        [utils.asGridCoords(9, 4)]: true,
        [utils.asGridCoords(1, 6)]: true,
        [utils.asGridCoords(2, 6)]: true,
        [utils.asGridCoords(3, 6)]: true,
        [utils.asGridCoords(4, 6)]: true,
        [utils.asGridCoords(5, 6)]: true,
        [utils.asGridCoords(6, 6)]: true,
        [utils.asGridCoords(8, 5)]: true,
        [utils.asGridCoords(3, 7)]: true,
        [utils.asGridCoords(4, 7)]: true,
        [utils.asGridCoords(6, 7)]: true,
        [utils.asGridCoords(2, 9)]: true,
        [utils.asGridCoords(3, 9)]: true,
        [utils.asGridCoords(4, 9)]: true,
        [utils.asGridCoords(7, 10)]: true,
        [utils.asGridCoords(8, 10)]: true,
        [utils.asGridCoords(9, 10)]: true,
        [utils.asGridCoords(0, 4)]: true,
        [utils.asGridCoords(0, 5)]: true,
        [utils.asGridCoords(0, 6)]: true,
        [utils.asGridCoords(0, 7)]: true,
        [utils.asGridCoords(0, 8)]: true,
        [utils.asGridCoords(0, 9)]: true,
        [utils.asGridCoords(0, 10)]: true,
        [utils.asGridCoords(0, 11)]: true,
        [utils.asGridCoords(10, 4)]: true,
        [utils.asGridCoords(10, 5)]: true,
        [utils.asGridCoords(10, 6)]: true,
        [utils.asGridCoords(10, 7)]: true,
        [utils.asGridCoords(10, 8)]: true,
        [utils.asGridCoords(10, 9)]: true,
        [utils.asGridCoords(10, 10)]: true,
        [utils.asGridCoords(10, 11)]: true,
        [utils.asGridCoords(1, 12)]: true,
        [utils.asGridCoords(2, 12)]: true,
        [utils.asGridCoords(3, 12)]: true,
        [utils.asGridCoords(4, 12)]: true,
        [utils.asGridCoords(6, 12)]: true,
        [utils.asGridCoords(7, 12)]: true,
        [utils.asGridCoords(8, 12)]: true,
        [utils.asGridCoords(9, 12)]: true,
        [utils.asGridCoords(5, 13)]: true,
      },
      cutsceneSpaces: {
        [utils.asGridCoords(5, 12)]: [
          {
            events: [
              {
                type: "changeMap",
                map: "dining",
                x: utils.withGrid(7),
                y: utils.withGrid(3),
                direction: "down",
              },
            ],
          },
        ],
      },
    };
  },
};
