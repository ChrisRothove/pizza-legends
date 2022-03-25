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
            talking: Cutscenes[0],
          }),
        };
    const erio = playerState.storyFlags["FIRST_DEFEAT"]
      ? {}
      : {
          erio: new Person({
            x: utils.withGrid(3),
            y: utils.withGrid(8),
            src: "./../images/characters/people/erio.png",
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
      },
      ...transitionCutscene,
    };
  },
};
