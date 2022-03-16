class PauseMenu {
  constructor({ progress, onComplete }) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions(pageKey, itemObject = null) {
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
            this.keyboardMenu.setOptions(this.getOptions("items"));
          },
          disabled: playerState.items.length === 0,
        },
        {
          label: "Ingredients",
          description: "Ingredients for making pizzas (coming soon)",
          handler: () => {
            // view Ingredients.
          },
        },
        {
          label: "Recipes",
          description: "Recipes for making pizzas (coming soon)",
          handler: () => {
            // view Recipes.
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
          right: () => "&#9733;",
        };
      });
      const reservePizzas = playerState.reserve.map((id) => {
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
        ...reservePizzas,
        {
          label: "Back",
          description: "Back to pause menu",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("root"));
          },
        },
      ];
    }
    //case 3: Show items
    if (pageKey === "items" && !itemObject) {
      let quantityMap = {};
      playerState.items.forEach((item) => {
        let existing = quantityMap[item.actionId];
        if (existing) {
          existing.quantity += 1;
        } else {
          quantityMap[item.actionId] = {
            actionId: item.actionId,
            quantity: 1,
            instanceId: item.instanceId,
          };
        }
      });
      const items = Object.values(quantityMap);

      return [
        ...items.map((itemKey) => {
          const item = Actions[itemKey.actionId];
          return {
            label: Actions[itemKey.actionId].name,
            description: item.description,
            handler: () => {
              this.keyboardMenu.setOptions(this.getOptions("items", itemKey));
            },
            right: () => itemKey.quantity,
            disabled: item.isBattleOnly,
          };
        }),
        {
          label: "Back",
          description: "Back to the main menu",
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions("root"));
          },
        },
      ];
    } else if (itemObject) {
      //case 3.b: individual item pages
      const action = Actions[itemObject.actionId];
      return [
        ...Object.keys(playerState.pizzas).map((pizzaId) => {
          const pizza = playerState.pizzas[pizzaId];
          return {
            label: pizza.name,
            description: `use ${action.name} on ${pizza.name}`,
            handler: async () => {
              const useItem = new OverworldEvent({
                map: null,
                event: {
                  ...action.success.filter(
                    (event) => event.type === "stateChange"
                  )[0],
                  type: "useItem",
                  target: pizza,
                },
              });
              await useItem.init();
              playerState.items = [
                ...playerState.items.filter(
                  (item) => item.instanceId !== itemObject.instanceId
                ),
              ];
              if (playerState.items.length > 0) {
                this.keyboardMenu.setOptions(this.getOptions("items"));
              } else {
                this.keyboardMenu.setOptions(this.getOptions("root"));
              }
              this.statPanel.setPanel(0);
            },
            disabled: !action.legalTarget(pizza),
          };
        }),
      ];
    }
    //Case 4: Show the options for just one pizza (by id)
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
    const equipped = Object.keys(playerState.pizzas)
      .filter((id) => {
        return playerState.lineup.indexOf(id) !== -1;
      })
      .map((id) => {
        const { pizzaId } = playerState.pizzas[id];
        const base = Pizzas[pizzaId];
        return {
          label: `Swap in for ${base.name}`,
          description: base.description,
          handler: () => {
            playerState.swapLineup(id, pageKey);
            this.keyboardMenu.setOptions(this.getOptions("pizzas"));
            this.statPanel.setPanel(0);
          },
        };
      });
    const isActive = playerState.lineup.indexOf(pageKey) !== -1;
    const otherPizzas = isActive ? unequipped : equipped;
    const frontOption = isActive
      ? [
          {
            label: "Move to front",
            description: "Move this pizza to the front of the list",
            handler: () => {
              playerState.moveToFront(pageKey);
              this.keyboardMenu.setOptions(this.getOptions("root"));
              this.statPanel.setPanel(0);
            },
          },
        ]
      : [];
    const slotOption =
      !isActive && playerState.lineup.length < 3
        ? [
            {
              label: "add to Active",
              description: "Add to active Pizza list",
              handler: () => {
                playerState.lineup.push(pageKey);
                playerState.reserve = [
                  ...playerState.reserve.filter((item) => item !== pageKey),
                ];
                utils.emitEvent("LineupChanged");
                this.keyboardMenu.setOptions(this.getOptions("root"));
                this.statPanel.setPanel(0);
              },
            },
          ]
        : [];
    return [
      ...otherPizzas,
      ...frontOption,
      ...slotOption,
      {
        label: "Pick Apart",
        description: "Dismantle and eat (gain some EXP and ingredients)",
        handler: () => {
          const pizza = playerState.pizzas[pageKey];
          playerState.addExp(Math.round(pizza.xp / 10));
          recipes[pizza.pizzaId].ingredients.forEach((item) => {
            playerState.ingredients.push({
              indexId: item,
              instanceId: `item${new Date()}`,
            });
          });
          playerState.removePizza(pageKey);
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
      KeyboardLength: 8,
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
