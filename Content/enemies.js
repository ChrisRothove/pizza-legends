window.enemies = {
  erio: {
    name: "Erio",
    src: "/images/characters/people/erio.png",
    rewards: {
      currency: 1000,
      items: ["item_recoverHp2"],
      ingredients: ["magic dough"],
    },
    pizzas: {
      a: {
        pizzaId: "s001",
        maxHp: 50,
        level: 1,
      },
      b: {
        pizzaId: "s002",
        maxHp: 50,
        level: 1,
      },
    },
  },
  beth: {
    name: "Beth",
    src: "/images/characters/people/npc1.png",
    rewards: {
      currency: 100,
      items: ["item_recoverHp"],
      ingredients: ["basil"],
    },
    pizzas: {
      a: {
        hp: 2,
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
