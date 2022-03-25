window.Cutscenes = [
  {
    name: "First Defeat 1",
    events: [
      {
        type: "textMessage",
        text: "?: You lost, so I'm cleaning you out, old man.",
      },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      {
        type: "changeMap",
        map: "mastersRoom",
        x: utils.withGrid(7),
        y: utils.withGrid(4),
        direction: "down",
      },
    ],
  },
  {
    name: "First Defeat 2",
    events: [
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "left" },
      { who: "hero", type: "walk", direction: "left" },
      { who: "hero", type: "walk", direction: "left" },
      { who: "master", type: "stand", direction: "right" },
      {
        type: "textMessage",
        text: "Master: Oh, Hero! Be careful, this man has been a Pizza Legend for many years...",
      },
      { type: "textMessage", text: "he was once my pupil but I..." },
      { type: "textMessage", text: "Hero: Just take it easy, Master." },
      { who: "hero", type: "stand", direction: "down" },
      {
        type: "textMessage",
        text: "?: Oh? Still teaching pups the old ways, Gramps?",
      },
      { who: "erio", type: "stand", direction: "up" },
      {
        type: "textMessage",
        text: "Hmph. Well, why don't you whip something up and we'll settle this like Legends.",
      },
    ],
  },
];
