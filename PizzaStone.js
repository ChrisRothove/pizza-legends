class PizzaStone extends GameObject {
  constructor(config) {
    super(config);
    this.sprite = new Sprite({
      gameObject: this,
      src: "/images/characters/pizza-stone.png",
      animations: {
        "used-down": [[0, 0]],
        "unused-down": [[1, 0]],
      },
      currentAnimation: "used-down",
    });
    this.doughCount = playerState.ingredients.filter(
      (item) => item.indexId === "magic dough"
    );
    this.pizzas = config.pizzas;

    this.talking =
      this.doughCount <= 0
        ? [
            {
              events: [
                { type: "textMessage", text: "You are out of magic dough" },
              ],
            },
          ]
        : Object.keys(playerState.pizzas).length >= 6
        ? [
            {
              events: [
                { type: "textMessage", text: "You already have 6 pizzas" },
              ],
            },
          ]
        : [
            {
              events: [
                {
                  type: "textMessage",
                  text: "It's the Master's legendary pizza stone...",
                },
                { type: "craftingMenu", pizzas: this.pizzas },
              ],
            },
          ];
  }

  update() {
    this.doughCount = playerState.ingredients.filter(
      (item) => item.indexId === "magic dough"
    );
    this.sprite.currentAnimation =
      this.doughCount <= 0 ? "used-down" : "unused-down";
  }
}
