class CraftingMenu {
  constructor({ pizzas, onComplete }) {
    this.pizzas = pizzas;
    this.onComplete = onComplete;
  }

  getOptions(pageId) {
    if (!pageId) {
      return [
        ...this.pizzas.map((id) => {
          const base = Pizzas[id];
          const disabled =
            Object.keys(playerState.pizzas).filter((pizzaId) => {
              const pizza = playerState.pizzas[pizzaId];
              return pizza.name === base.name;
            }).length > 0;
          return {
            label: base.name,
            description: base.description,
            handler: () => {
              this.statPanel = new StatPanel({
                id,
              });
              this.statPanel.init(this.displayElement);
              this.statPanel.setPanel(id);
              this.listMenu.setOptions(this.getOptions(id));
            },
            disabled,
            right: () => {
              return disabled ? "&#9733;" : "";
            },
          };
        }),
        {
          label: "Close",
          description: "leave the pizza menu",
          handler: () => {
            this.close();
          },
        },
      ];
    } else {
      const disabled =
        this.statPanel.ingredient1.value.length <= 0 ||
        this.statPanel.ingredient2.value.length <= 0 ||
        this.statPanel.ingredient3.value.length <= 0;
      return [
        {
          label: `Create this pizza`,
          description: "Add this pizza to your team",
          handler: () => {
            playerState.addPizza(pageId);
            playerState.removeIngredients(
              this.statPanel.ingredient1.value[0].instanceId
            );
            playerState.removeIngredients(
              this.statPanel.ingredient2.value[0].instanceId
            );
            playerState.removeIngredients(
              this.statPanel.ingredient3.value[0].instanceId
            );
            const magicDough = playerState.ingredients.find(
              (item) => item.indexId === "magic dough"
            );
            playerState.removeIngredients(magicDough.instanceId);
            this.close();
          },
          disabled,
        },
        {
          label: "Back",
          description: disabled
            ? "You don't have enough ingredients"
            : "Go back to pizza select",
          handler: () => {
            this.statPanel.end();
            this.listMenu.setOptions(this.getOptions());
          },
        },
      ];
    }
  }

  createElement() {
    this.listElement = document.createElement("div");
    this.listElement.classList.add("CraftingMenu");
    this.listElement.classList.add("overlayMenu");
    this.listElement.classList.add("left");
    this.listElement.innerHTML = `
      <h2>Create a Pizza</h2>
    `;

    this.displayElement = document.createElement("div");
    this.displayElement.classList.add("overlayMenu");
    this.displayElement.classList.add("pizzaPaneRight");
  }

  close() {
    this.listMenu.end();
    this.listElement.remove();
    this.displayElement.remove();
    this.onComplete();
  }

  init(container) {
    this.createElement();
    this.listMenu = new KeyboardMenu({
      descriptionContainer: container,
      KeyboardLength: 8,
    });
    this.listMenu.init(this.listElement);
    this.listMenu.setOptions(this.getOptions());

    container.appendChild(this.listElement);
    container.appendChild(this.displayElement);
  }
}
