window.mapMaker = {
  nullRoom: () => {
    return {
      id: "Empty Room",
      lowerSrc: null,
      upperSrc: null,
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
      },
    };
  },
};
