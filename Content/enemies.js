window.enemies = {
  erio: {
    name: "Erio",
    src: "/images/characters/people/erio.png",
    rewards: {
      currency: 1000,
      items: ["item_recoverHp2"],
      ingredients: ["magic dough", "pepperoni", "cheddar", "tomato sauce"],
    },
    pizzas: {
      a: {
        hp: 2,
        pizzaId: "c001",
        maxHp: 280,
        level: 1,
        stats: {
          vit: 28,
          atk: 8,
          def: 10,
          spd: 4,
        },
      },
    },
  },
  beth: {
    name: "Beth",
    src: "/images/characters/people/npc1.png",
    rewards: {
      currency: 100,
      items: ["item_recoverHp"],
      ingredients: ["pepperoni", "cheddar", "tomato sauce"],
    },
    pizzas: {
      a: {
        hp: 280,
        pizzaId: "f001",
        maxHp: 280,
        level: 1,
        stats: {
          vit: 28,
          atk: 8,
          def: 10,
          spd: 4,
        },
      },
    },
  },
};
