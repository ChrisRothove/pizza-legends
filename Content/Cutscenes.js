window.Cutscenes = [
  {
    name: "First Defeat 1",
    events: [
      {
        type: "textMessage",
        text: "You lost, so I'm cleaning you out, old man.",
        speaker: "null",
        name: "???",
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
      { who: "master", type: "stand", direction: "right" },
      {
        type: "textMessage",
        text: "Oh, Pietro! Be careful, Erio has been a Pizza Legend for many years...",
        speaker: "npc5",
        name: "Master",
      },
      {
        type: "textMessage",
        text: "he was once my pupil but I...",
        speaker: "npc5",
        name: "Master",
      },
      {
        type: "textMessage",
        text: "Just take it easy, Master.",
        speaker: "hero",
        name: "Pietro",
      },
      { who: "erio", type: "stand", direction: "up" },
      {
        type: "textMessage",
        text: "Oh? Still teaching pups the old ways, Gramps?",
        speaker: "erio",
        name: "Erio",
      },
      {
        type: "textMessage",
        text: "Hmph. Well, why don't you whip something up and we'll settle this like Legends.",
        speaker: "erio",
        name: "Erio",
      },
      {
        type: "textMessage",
        text: "Don't let him bait you, child...",
        speaker: "npc5",
        name: "Master",
      },
      { who: "hero", type: "stand", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "left" },
      { who: "master", type: "stand", direction: "down" },
      { who: "hero", type: "stand", direction: "down" },
      {
        type: "textMessage",
        text: "No way I'm letting him walk all over you!",
        speaker: "hero",
        name: "Pietro",
      },
      {
        type: "textMessage",
        text: "You...want to protect me? What a foolish child...",
        speaker: "npc5",
        name: "Master",
      },
      {
        type: "textMessage",
        text: "...Thank you. Use the pizza stone like I taught you.",
        speaker: "npc5",
        name: "Master",
      },
      {
        type: "textMessage",
        text: "We should have one good ball of dough left.",
        speaker: "npc5",
        name: "Master",
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
      { who: "erio", type: "walk", direction: "down" },
      { who: "erio", type: "removeObject" },
      { type: "addStoryFlag", flag: "FIRST_DEFEAT" },
    ],
  },
];
