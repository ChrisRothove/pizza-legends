window.Cutscenes = [
  // First Defeat
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
      { type: "battle", enemyId: "erio", canLose: true },
      {
        type: "textMessage",
        text: "See? No one in this town is a match for me.",
        speaker: "erio",
        name: "Erio",
      },
      {
        type: "textMessage",
        text: "It only makes sense that I am the only one who can save it. Erio...out.",
        speaker: "erio",
        name: "Erio",
      },
      { who: "erio", type: "walk", direction: "down" },
      { who: "erio", type: "removeObject" },
      { type: "addStoryFlag", flag: "FIRST_DEFEAT" },
      { type: "updateStoryValue", flag: "CITY_STATE" },
      { type: "updateStoryValue", flag: "DEMO_STATE" },
    ],
  },
  //Exhibition
  {
    name: "Exhibition",
    events: [
      {
        type: "textMessage",
        text: "Pietro! Big Sis just keeps fighting anybody she can!",
        speaker: "npc4",
        name: "Paprika",
        faceHero: "paprika",
      },
      {
        type: "textMessage",
        text: "Get in the ring and knock some sense into her so we can go home!",
        speaker: "npc4",
        name: "Paprika",
      },
      {
        type: "textMesssage",
        text: "Sorry, Pap. I don't have a pie to throw right now. That bastard Erio just cleaned us out...",
        speaker: "hero",
        name: "Pietro",
      },
      {
        type: "textMessage",
        text: "Head to the shop. I'm sure dad will lend you some stuff.",
        speaker: "npc4",
        name: "Paprika",
      },
      {
        type: "textMessage",
        text: "Hurry up, before she gets hurt...",
        speaker: "npc4",
        name: "Paprika",
      },
      { who: "paprika", type: "walk", direction: "up" },
      { type: "addStoryFlag", flag: "EXHIBITION" },
      { type: "updateStoryValue", flag: "STACK_STATE" },
    ],
  },
  //FREEBIE
  {
    name: "Freebie",
    events: [
      {
        type: "textMessage",
        text: "Oh, it's you. If you're here about me selling stuff to the Green Machine...",
        speaker: "npc3",
        name: "Stacker",
        faceHero: "stacker",
      },
      {
        type: "textMessage",
        text: "I've got mouths to feed. Bad business is bad for everyone.",
        speaker: "npc3",
        name: "Stacker",
      },
      {
        type: "textMessage",
        text: "And on top of that, my kid's out there on a tirade.",
        speaker: "npc3",
        name: "Stacker",
      },
      {
        type: "textMessage",
        text: "Actually, I'm here about Beth. Paprika asked me to challenge her, but Erio...",
        speaker: "hero",
        name: "Pietro",
      },
      {
        type: "textMessage",
        text: "Oh...So he got the old man too. Look, I can't just give you free stuff...",
        speaker: "npc3",
        name: "Stacker",
      },
      {
        type: "textMessage",
        text: "...But if you get Beth to come home, we'll call it even, capiche?",
        speaker: "npc3",
        name: "Stacker",
      },
      {
        type: "textMessage",
        text: "You got it. Just the usual, please.",
        speaker: "hero",
        name: "Pietro",
      },
      {
        type: "textMessage",
        text: "Here you go. You can use my old Pizza Stone if you want to work your magic here.",
        speaker: "npc3",
        name: "Stacker",
      },
      {
        type: "ingredientGet",
        items: ["Magic Dough", "pepperoni", "cheddar", "tomato sauce"],
      },
      {
        type: "textMessage",
        text: "Got Magic Dough, Pepperoni, Cheddar, and Tomato Sauce!",
      },
      { type: "addStoryFlag", flag: "FREEBIE" },
      { type: "updateStoryValue", flag: "CITY_STATE" },
    ],
  },
];
