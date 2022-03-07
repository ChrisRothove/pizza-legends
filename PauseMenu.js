class PauseMenu {
  constructor({ progress, onComplete }) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    //Case 1: Show the first page of options
    if (pageKey === "root") {
      return [
        {
          label: "Pizzas",
          description: "Check out your pizzas",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("pizzas"));
          },
        },
        {
          label: "Items",
          description: "View and Use Items (coming soon)",
          handler: () => {
            // open items and use/view them.
          },
        },
        {
          label: "Ingredients",
          description: "Ingredients for making pizzas (coming soon)",
          handler: () => {
            // view Ingredients.
          },
        },
        {
          label: "Controls",
          description: "Map keybinds (coming soon)",
          handler: () => {
            // open keymap screen
          },
        },
        {
          label: "Save",
          description: "Save your progress",
          handler: () => {
            //We'll come back to this...
            this.progress.save();
            this.close();
          },
        },
        {
          label: "Load",
          description: "Load progress",
          handler: () => {
            this.progress.load();
          },
        },
        {
          label: "Close",
          description: "Close the pause menu",
          handler: () => {
            this.close();
          },
        },
      ];
    }

    //Case 2: Show available pizzas
    if (pageKey === "pizzas") {
      const lineupPizzas = playerState.lineup.map((id) => {
        const { pizzaId } = playerState.pizzas[id];
        const base = Pizzas[pizzaId];
        return {
          label: base.name,
          description: base.description,
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions(id));
            this.statPanel.setPanel(id);
          },
        };
      });
      return [
        ...lineupPizzas,
        {
          label: "Close",
          description: "Close the pause menu",
          handler: () => {
            this.close();
          },
        },
      ];
    }

    //Case 3: Show the options for just one pizza (by id)
    const unequipped = Object.keys(playerState.pizzas)
      .filter((id) => {
        return playerState.lineup.indexOf(id) === -1;
      })
      .map((id) => {
        const { pizzaId } = playerState.pizzas[id];
        const base = Pizzas[pizzaId];
        return {
          label: `Swap for ${base.name}`,
          description: base.description,
          handler: () => {
            playerState.swapLineup(pageKey, id);
            this.keyboardMenu.setOptions(this.getOptions("pizzas"));
            this.statPanel.setPanel(0);
          },
        };
      });

    return [
      ...unequipped,
      {
        label: "Move to front",
        description: "Move this pizza to the front of the list",
        handler: () => {
          playerState.moveToFront(pageKey);
          this.keyboardMenu.setOptions(this.getOptions("root"));
          this.statPanel.setPanel(0);
        },
      },
      {
        label: "Back",
        description: "Back to root menu",
        handler: () => {
          this.keyboardMenu.setOptions(this.getOptions("root"));
          this.statPanel.setPanel(0);
        },
      },
    ];
  }

  createElement() {
    this.element = document.createElement("div");
    this.panelElement = document.createElement("div");
    this.panelElement.classList.add("overlayMenu");
    this.panelElement.classList.add("pizzaPaneRight");
    this.element.classList.add("PauseMenu");
    this.element.classList.add("overlayMenu");
    this.element.classList.add("left");
    this.element.innerHTML = `
      <h2>Pause Menu</h2>
    `;
  }

  close() {
    this.esc?.unbind();
    this.keyboardMenu.end();
    this.element.remove();
    this.panelElement.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container,
    });
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions("root"));

    this.statPanel = new StatPanel({
      id: 0,
    });
    this.statPanel.init(this.panelElement);
    this.statPanel.setPanel();

    container.appendChild(this.element);
    container.appendChild(this.panelElement);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}
