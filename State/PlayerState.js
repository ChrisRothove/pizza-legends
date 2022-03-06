class PlayerState {
  constructor() {
    this.pizzas = {
      p1: {
        pizzaId: "s001",
        hp: 200,
        maxHp: 200,
        xp: 0,
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
    this.pizzaLevel = 1;
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
    this.pizzas[newId] = {
      pizzaId,
      hp: 50,
      maxHp: 50,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
    };
    if (this.lineup.length < 3) {
      this.lineup.push(newId);
    }
    utils.emitEvent("LineupChanged");
    console.log(this);
  }

  removePizza(pizzaId) {
    delete pizzas[pizzaId];
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
