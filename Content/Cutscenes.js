window.Cutscenes = [
  {
    name: "First Defeat 1",
    events: [
      {
        type: "textMessage",
        text: "???: You lost, so I'm cleaning you out, old man.",
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
      { who: "erio", type: "stand", direction: "up" },
      {
        type: "textMessage",
        text: "???: Oh? Still teaching pups the old ways, Gramps?",
      },
      { who: "hero", type: "stand", direction: "down" },
      {
        type: "textMessage",
        text: "Hmph. Well, why don't you whip something up and we'll settle this like Legends.",
      },
      { type: "textMessage", text: "Master: Don't let him bait you, child..." },
      {
        type: "textMessage",
        text: "Master: You...want to protect me? What a foolish child...",
      },
      {
        type: "textMessage",
        text: "...Thank you. Use the pizza stone like I taught you.",
      },
      {
        type: "textMessage",
        text: "We should have one good ball of dough left.",
      },
    ],
  },
  {
    name: "First Defeat 3",
    events: [
      { type: "battle", enemyId: "erio" },
      {
        type: "textMessage",
        text: "Erio: See? No one in this town is a match for me.",
      },
      {
        type: "textMessage",
        text: "It only makes sense that I am the only one who can save it. Erio...out.",
      },
      { who: "erio", type: "walk", direction: "right" },
      { who: "erio", type: "walk", direction: "right" },
      { who: "erio", type: "walk", direction: "down" },
      { who: "erio", type: "walk", direction: "down" },
      { who: "erio", type: "removeObject" },
      { type: "addStoryFlag", flag: "FIRST_DEFEAT" },
    ],
  },
];
