window.Actions = {
  //Normal Moves
  damage1: {
    name: "Whomp!",
    description: "Pillowy punch of dough",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 4,
        hit: utils.determineHit,
      },
    ],
  },
  damage2: {
    name: "Crust Rush",
    description: "Really grates on 'em",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => Math.round(atk * 5),
        hit: utils.determineHit,
      },
    ],
  },
  dot1: {
    name: "Tabasco Sauce",
    description: "Target loses HP each turn",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "glob", color: "#dc143c" },
      { type: "stateChange", status: { type: "tabasco", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is flamin' hot!" },
    ],
  },
  multi1: {
    name: "Black-eyed Olives",
    description: "A blast of tiny veggies",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "blast", color: "#000000" },
      {
        type: "stateChange",
        damage: (atk) => atk * 2,
        hit: utils.determineHit,
      },
      { type: "animation", animation: "blast", color: "#000000" },
      {
        type: "stateChange",
        damage: (atk) => Math.round(atk * 2.25),
        hit: utils.determineHit,
      },
      { type: "animation", animation: "blast", color: "#000000" },
      {
        type: "stateChange",
        damage: (atk) => Math.round(atk * 2.5),
        hit: utils.determineHit,
      },
    ],
  },
  saucyStatus: {
    name: "Tomato Squeeze",
    description: "Recovers HP each turn",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },
    ],
  },
  clumsyStatus: {
    name: "Olive Oil",
    description: "The target may fail to act on their turn",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is slipping all around!" },
    ],
  },
  //Spicy Attacks
  spicy1: {
    name: "Pepper Squirt",
    description: "Not the eyes! Deals Spicy damage",
    damageType: "spicy",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "glob", color: "red" },
      {
        type: "stateChange",
        damage: (atk) => atk * 4,
        hit: utils.determineHit,
      },
    ],
  },
  spicy2: {
    name: "Pepperoni Pile Driver",
    description: "A heavy strike with peperoni slices",
    damageType: "spicy",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 5,
        hit: utils.determineHit,
      },
    ],
  },
  "spicy+dot1": {
    name: "Ghost Pepper Haunt",
    description: "A dish that keeps on giving",
    damageType: "spicy",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 3,
        hit: utils.determineHit,
      },
      { type: "stateChange", status: { type: "tabasco", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is haunted by that heat!" },
    ],
  },
  //Veggie Attacks
  veggie1: {
    name: "Basil Bash",
    description: "A feral and fragrant smash",
    damageType: "veggie",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 4,
        hit: utils.determineHit,
      },
    ],
  },
  veggie2: {
    name: "Pesto Press",
    description: "A slippery and savage solution",
    damageType: "veggie",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 5,
        hit: utils.determineHit,
      },
    ],
  },
  "veggie+dot2": {
    name: "Kale-trops",
    description: "Scatter sharp leaves to damage every turn",
    damageType: "veggie",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", status: { type: "kaled", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is walking on kale!" },
    ],
  },
  //Fungi
  fungi1: {
    name: "Mushroom Melt",
    description: "A smooth, creamy way to die",
    damageType: "fungi",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 4,
        hit: utils.determineHit,
      },
    ],
  },
  fungi2: {
    name: "Shitake Stake",
    description: "They'll never see it coming.",
    damageType: "fungi",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "blast", color: "#000000" },
      {
        type: "stateChange",
        damage: (atk) => atk * 5,
        hit: utils.determineHit,
      },
    ],
  },
  //Chill Attacks
  chill1: {
    name: "Arti-choke",
    description: "Smothers the target in a delicious...whoops.",
    damageType: "chill",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 4,
        hit: utils.determineHit,
      },
    ],
  },
  "chill+saucy1": {
    name: "Garlic Glaze",
    description: "A little something for everyone.",
    damageType: "chill",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      {
        type: "stateChange",
        damage: (atk) => atk * 3,
        hit: utils.determineHit,
      },
      {
        type: "stateChange",
        status: { type: "saucy", expiresIn: 3 },
        onCaster: true,
      },
    ],
  },
  frozenStatus: {
    name: "Freezer Fresh",
    description: "It's not delivery it's...not thawed either",
    damageType: "chill",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", status: { type: "frozen", expiresIn: 1 } },
      { type: "textMessage", text: "{TARGET} is frozen solid!" },
    ],
  },

  //Buffs
  speed1: {
    name: "Speed Up",
    description: "Target makes itself harder to hit",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "buff" },
      {
        type: "stateChange",
        status: { type: "speed+", expiresIn: 3 },
        onCaster: true,
      },
      { type: "textMessage", text: "{TARGET} is specially seasoned!" },
    ],
  },
  attack1: {
    name: "Attack Up",
    description: "Target makes itself stronger",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "buff" },
      {
        type: "stateChange",
        status: { type: "attack+", expiresIn: 3 },
        onCaster: true,
      },
      { type: "textMessage", text: "{TARGET} is getting pumped!" },
    ],
  },
  defense1: {
    name: "Defense Up",
    description: "Target makes itself bulkier",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "buff" },
      {
        type: "stateChange",
        status: { type: "defense+", expiresIn: 3 },
        onCaster: true,
      },
      { type: "textMessage", text: "{TARGET} is perfectly prepared!" },
    ],
  },
  //Items
  item_recoverStatus: {
    name: "Heating Lamp",
    description: "Feeling fresh and warm",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", status: null },
      { type: "textMessage", text: "Feeling fresh!" },
    ],
    price: 25,
    legalTarget: (pizza) => false,
  },
  item_recoverHp: {
    name: "Parmesan Packet",
    description: "Heals the target 75 HP",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} sprinkles on some parmesan!" },
      { type: "stateChange", recover: 75 },
      { type: "textMessage", text: "{CASTER} recovers HP!" },
    ],
    price: 50,
    legalTarget: (pizza) => pizza.hp !== pizza.maxHp,
  },
  item_recoverHp2: {
    name: "Parmesan Shaker",
    description: "Heals the target 150 HP",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} sprinkles on some parmesan!" },
      { type: "stateChange", recover: 150 },
      { type: "textMessage", text: "{CASTER} recovers HP!" },
    ],
    price: 100,
    legalTarget: (pizza) => pizza.hp !== pizza.maxHp,
  },
  item_attack1: {
    name: "Attack Sauce",
    description: "Increases atk for 3 turns",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "buff" },
      { type: "stateChange", status: { type: "attack+", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is getting pumped!" },
    ],
    price: 35,
    legalTarget: (pizza) => false,
  },
  item_defense1: {
    name: "Defense Sauce",
    description: "Increases def for 3 turns",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "buff" },
      { type: "stateChange", status: { type: "defense+", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is getting pumped!" },
    ],
    price: 35,
    legalTarget: (pizza) => false,
  },
  item_speed1: {
    name: "Speed Sauce",
    description: "Increases spd for 3 turns",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "buff" },
      { type: "stateChange", status: { type: "speed+", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is getting pumped!" },
    ],
    price: 35,
    legalTarget: (pizza) => false,
  },
};
