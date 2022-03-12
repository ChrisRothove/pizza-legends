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
                { type: "textMessage", text: "You have already used this." },
              ],
            },
          ]
        : [
            {
              events: [
                {
                  type: "textMessage",
                  text: "Approaching the legendary pizza stone...",
                },
                { type: "craftingMenu", pizzas: this.pizzas },
                { type: "addStoryFlag", flag: this.storyFlag },
              ],
            },
          ];
  }

  update() {
    this.sprite.currentAnimation =
      this.doughCount <= 0 ? "used-down" : "unused-down";
  }
}
