class PlayerState {
  constructor() {
    this.pizzas = {
      p1: {
        ...Pizzas["n001"],
        pizzaId: "n001",
        hp: 200,
        maxHp: 200,
        xp: 99,
        maxXp: levels[2],
        level: 1,
        status: null,
        stats: {
          vit: 20,
          atk: 10,
          def: 10,
          spd: 10,
        },
      },
    };
    this.lineup = ["p1"];
    this.items = [
      { actionId: "item_recoverHp", instanceId: "item1" },
      { actionId: "item_recoverHp", instanceId: "item2" },
      { actionId: "item_recoverHp", instanceId: "item3" },
    ];
    this.storyFlags = {};

    this.recipes = ["n001"];
    this.currency = 15;
    this.pizzaLevel = 10;
    this.pizzaExp = 0;
  }

  addRecipe(recipeId) {
    this.recipes.push(recipeId);
  }

  addCurrency(amount) {
    this.currency += amount;
  }

  removeCurrency(amount) {
    this.currency -= amount;
  }

  addExp(amount) {
    this.pizzaExp += amount;
  }

  addPizza(pizzaId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
    const archetype = Pizzas[pizzaId];
    const { vit, atk, def, spd } = archetype.attributes;
    this.pizzas[newId] = {
      ...archetype,
      pizzaId,
      hp: vit * 10,
      maxHp: vit * 10,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
      stats: {
        vit,
        atk,
        def,
        spd,
      },
    };
    console.log(this.pizzas[newId]);
    if (this.pizzaLevel > 1) {
      const diff = this.pizzaLevel - 1;
      for (let i = 1; i <= diff; i++) {
        this.levelUpPizza(newId);
      }
    }
    if (this.lineup.length < 3) {
      this.lineup.push(newId);
    }
    utils.emitEvent("LineupChanged");
    console.log("new State:", this);
  }

  levelUpPizza(pizzaId) {
    console.log(pizzaId);
    const thePizza = this.pizzas[pizzaId];
    console.log(thePizza);
    thePizza.level += 1;
    // set xp if not correct
    if (thePizza.xp !== levels[thePizza.level]) {
      thePizza.xp = levels[thePizza.level];
    }
    thePizza.maxXp = levels[thePizza.level + 1];
    // uptick HP
    const toAdd =
      thePizza.level % thePizza.vitRate ? Math.round(thePizza.vit / 2) : 0;
    thePizza.maxHp += toAdd;
    thePizza.hp = thePizza.maxHp;

    // uptick atk
    thePizza.stats.atk += thePizza.level % thePizza.attributes.atkRate ? 0 : 1;

    // uptick def
    thePizza.stats.def += thePizza.level % thePizza.attributes.defRate ? 0 : 1;

    // uptick spd
    thePizza.stats.spd += thePizza.level % thePizza.attributes.spdRate ? 0 : 1;
  }

  removePizza(pizzaId) {
    delete this.pizzas[pizzaId];
    this.lineup = [...this.lineup.filter((pizzaId) => pizzaId !== pizzaId)];
    utils.emitEvent("LineupChanged");
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineup.indexOf(oldId);
    this.lineup[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }

  moveToFront(futureFrontId) {
    this.lineup = this.lineup.filter((id) => id !== futureFrontId);
    this.lineup.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }
}
window.playerState = new PlayerState();
