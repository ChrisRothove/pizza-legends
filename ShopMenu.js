class ShopMenu {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.tab = "left";
  }

  getBuyOptions() {
    return [
      ...Object.values(ingredients).map((ingred) => {
        const money = playerState.currency;
        const diff = money - ingred.price;
        return {
          label: ingred.name,
          description: `Buy some ${ingred.name}`,
          handler: () => {
            money -= ingred.price;
            playerState.ingredients.push({
              indexId: ingred.name,
              instanceId: `ingred${new Date()}`,
            });

            const moneySpan = document.querySelector(".currentMoney");
            moneySpan.textContent = money;
          },
          right: () => {
            return `<em>$$$${ingred.price}</em>`;
          },
          disabled: diff < 0 || this.tab === "right" ? true : false,
        };
      }),
    ];
  }
  getSellOptions() {
    return [
      ...playerState.items.map((item) => {
        const selected = Actions[item.actionId];
        return {
          label: selected.name,
          description: selected.description,
          handler: () => {
            playerState.addCurrency(Math.round(selected.price / 2));
            playerState.items = playerState.items.filter(
              (otherItem) => otherItem !== item
            );

            const moneySpan = document.querySelector(".currentMoney");
            moneySpan.textContent = `${playerState.currency}`;

            this.sellMenu.setOptions(this.getSellOptions());
            this.buyMenu.setOptions(this.getBuyOptions());
          },
          right: () => {
            return `<em>$$$${Math.round(selected.price / 2)}</em>`;
          },
          disabled: this.tab === "left" ? true : false,
        };
      }),
      ...playerState.ingredients.map((ingred) => {
        const selected = ingredients[ingred.indexId];
        return {
          label: selected.name,
          description: `Sell your ${selected.name}`,
          handler: () => {
            playerState.addCurrency(Math.round(selected.price / 2));
            playerState.ingredients = playerState.ingredients.filter(
              otherIngred !== ingred
            );

            const moneySpan = document.querySelector(".currentMoney");
            moneySpan.textContent = `${playerState.currency}`;

            this.sellMenu.setOptions(this.getSellOptions());
            this.buyMenu.setOptions(this.getBuyOptions());
          },
          right: () => {
            return `<em>$$$${Math.round(selected.price / 2)}</em>`;
          },
          disabled: this.tab === "left" ? true : false,
        };
      }),
    ];
  }

  swapList(side) {
    if (side === "right") {
      this.sellMenu.setOptions(this.getSellOptions());
      this.buyMenu.setOptions(this.getBuyOptions());
      this.sellMenu.descriptionElement.classList.remove("hidden");
      this.buyMenu.descriptionElement.classList.add("hidden");
    } else {
      this.sellMenu.setOptions(this.getSellOptions());
      this.buyMenu.setOptions(this.getBuyOptions());
      this.sellMenu.descriptionElement.classList.add("hidden");
      this.buyMenu.descriptionElement.classList.remove("hidden");
    }
  }

  createElement() {
    this.buyElement = document.createElement("div");
    this.sellElement = document.createElement("div");
    this.sellElement.classList.add("overlayMenu");
    this.sellElement.classList.add("pizzaPaneRight");
    this.buyElement.classList.add("PauseMenu");
    this.buyElement.classList.add("overlayMenu");
    this.buyElement.classList.add("left");
    this.buyElement.innerHTML = `
      <h2>The Stack</h2>
    `;
    this.sellElement.innerHTML = `
      <h2>Hero - $$$
      <span class="currentMoney">${playerState.currency}</span>
      </h2>
    `;
  }

  close() {
    this.esc?.unbind();
    this.right?.unbind();
    this.left?.unbind();
    this.buyMenu.end();
    this.sellMenu.end();
    this.buyElement.remove();
    this.sellElement.remove();
    this.onComplete(this.cart);
  }

  async init(container) {
    this.createElement();
    this.buyMenu = new KeyboardMenu({
      descriptionContainer: container,
      KeyboardLength: 8,
    });
    this.sellMenu = new KeyboardMenu({
      descriptionContainer: container,
      KeyboardLength: 8,
    });
    this.buyMenu.init(this.buyElement);
    this.buyMenu.setOptions(this.getBuyOptions());

    this.sellMenu.init(this.sellElement);
    this.sellMenu.setOptions(this.getSellOptions());

    container.appendChild(this.buyElement);
    container.appendChild(this.sellElement);

    this.right = new KeyPressListener("ArrowRight", () => {
      this.tab = "right";
      this.swapList("right");
    });

    this.left = new KeyPressListener("ArrowLeft", () => {
      this.tab = "left";
      this.swapList("left");
    });

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}
