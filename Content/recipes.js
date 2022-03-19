window.recipes = {
  n001: {
    label: "Slice Samurai",
    ingredients: ["pepperoni", "cheddar", "tomato sauce"],
  },
  n002: {
    label: "Alfredo Snake-eyes",
    ingredients: ["black olives", "cheddar", "alfredo sauce"],
  },
  s001: {
    label: "Bacon Brigade",
    ingredients: ["bacon", "feta", "spicy marinara"],
  },
  s002: {
    label: "Deep Dish Volcano",
    ingredients: ["cheese mix", "peppers", "spicy marinara"],
  },
  v001: {
    label: "Kale-eye-descope",
    ingredients: ["kale", "cheddar", "tomato sauce"],
  },
  v002: {
    label: "Spinning Spinach",
    ingredients: ["spinach", "feta", "alfredo sauce"],
  },
  f001: {
    label: "Portobello Express",
    ingredients: ["portobello", "cheddar", "tomato sauce"],
  },
  f002: {
    label: "Chanterella",
    ingredients: ["chanterelle", "feta", "garlic sauce"],
  },
  c001: {
    label: "Pineapple Punch",
    ingredients: ["pineapple", "cheddar", "alfredo sauce"],
  },
  c002: {
    label: "Margherita Mellow",
    ingredients: ["tomatoes", "basil", "alfredo sauce"],
  },
};

window.ingredients = {
  "magic dough": {
    name: "magic dough",
    price: 50,
  },
  pepperoni: {
    name: "pepperoni",
    price: 37,
  },
  cheddar: {
    name: "cheddar",
    price: 20,
  },
  "tomato sauce": {
    name: "tomato sauce",
    price: 25,
  },
  "black olives": {
    name: "black olives",
    price: 15,
  },
  "alfredo sauce": {
    name: "alfredo sauce",
    price: 20,
  },
  bacon: {
    name: "bacon",
    price: 45,
  },
  feta: {
    name: "feta",
    price: 25,
  },
  "spicy marinara": {
    name: "spicy marinara",
    price: 30,
  },
  "cheese mix": {
    name: "cheese mix",
    price: 40,
  },
  peppers: {
    name: "peppers",
    price: 20,
  },
  kale: {
    name: "kale",
    price: 25,
  },
  spinach: {
    name: "spinach",
    price: 30,
  },
  portobello: {
    name: "portobello",
    price: 25,
  },
  chanterelle: {
    name: "chanterelle",
    price: 35,
  },
  "garlic sauce": {
    name: "garlic sauce",
    price: 25,
  },
  pineapple: {
    name: "pineapple",
    price: 35,
  },
  tomatoes: {
    name: "tomatoes",
    price: 30,
  },
  basil: {
    name: "basil",
    price: 15,
  },
};

window.AddOns = {
  "stuffed crust": {
    name: "stuffed crust",
    description: "Pizza gains 20 starting HP",
    effect: (pizza) => {
      pizza.maxHp += 20;
      pizza.hp += 20;
    },
    disabled: (pizza) => false,
  },
  "extra cheese": {
    name: "extra cheese",
    description: "Pizza gains +5 DEF",
    effect: (pizza) => (pizza.stats.def += 5),
    disabled: (pizza) => false,
  },
  "pretzel crust": {
    name: "pretzel crust",
    description: "Pizza gains +5 ATK",
    effect: (pizza) => (pizza.stats.atk += 5),
    disabled: (pizza) => false,
  },
  "garlic sauce": {
    name: "garlic sauce",
    description: "Pizza learns Olive Oil",
    effect: (pizza) => pizza.actions.push("clumsyStatus"),
    disabled: (pizza) => pizza.actions.length > 3,
  },
  "butter glaze": {
    name: "butter glaze",
    description: "Pizza gains +5 SPD",
    effect: (pizza) => (pizza.stats.spd += 5),
    disabled: (pizza) => false,
  },
  "sirracha sauce": {
    name: "sirracha sauce",
    description: "Pizza learns Tomato Squeeze",
    effect: (pizza) => pizza.actions.push("saucyStatus"),
    disabled: (pizza) => pizza.actions.length > 3,
  },
  "truffle powder": {
    name: "truffle powder",
    description: "Pizza learns Shitake Stake",
    effect: (pizza) => pizza.actions.push("fungi2"),
    disabled: (pizza) => pizza.actions.length > 3,
  },
  "thin crust": {
    name: "thin crust",
    description: "Pizza learns Crust Rush",
    effect: (pizza) => pizza.actions.push("damage2"),
    disabled: (pizza) => pizza.actions.length > 3,
  },
};
