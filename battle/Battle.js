class Battle {
  constructor({ enemy, onComplete }) {
    console.log("enemy", enemy);
    this.enemy = enemy;
    this.onComplete = onComplete;

    this.combatants = {};

    this.activeCombatants = {
      player: null, //"player1",
      enemy: null, //"enemy1",
    };

    //Dynamically add the Player team
    window.playerState.lineup.forEach((id) => {
      this.addCombatant(id, "player", window.playerState.pizzas[id]);
    });
    //Now the enemy team
    Object.keys(this.enemy.pizzas).forEach((key) => {
      this.addCombatant("e_" + key, "enemy", this.enemy.pizzas[key]);
    });

    //Start empty
    this.items = [];

    //Add in player items
    window.playerState.items.forEach((item) => {
      this.items.push({
        ...item,
        team: "player",
      });
    });

    this.usedInstanceIds = {};
  }

  addCombatant(id, team, config) {
    this.combatants[id] = new Combatant(
      {
        ...Pizzas[config.pizzaId],
        ...config,
        team,
        isPlayerControlled: team === "player",
      },
      this
    );

    //Populate first active pizza

    console.log(this);
    this.activeCombatants[team] = this.activeCombatants[team] || id;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = `
      <div class="Battle_hero">
        <img src="${"images/characters/people/hero.png"}" alt="hero">
      </div>
      <div class="Battle_enemy">
        <img src="${this.enemy.src}" alt="${this.enemy.name}">
      </div>
    `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.playerTeam = new Team("player", "Hero");
    this.enemyTeam = new Team("enemy", "Bully");

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);

      //Add to correct team
      if (combatant.team === "player") {
        this.playerTeam.combatants.push(combatant);
      } else if (combatant.team === "enemy") {
        this.enemyTeam.combatants.push(combatant);
      }
    });

    this.playerTeam.init(this.element);
    this.enemyTeam.init(this.element);

    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        });
      },
      onWinner: async (winner) => {
        if (winner === "player") {
          const playerState = window.playerState;
          Object.keys(playerState.pizzas).forEach((id) => {
            const playerStatePizza = playerState.pizzas[id];
            const combatant = this.combatants[id];
            if (combatant) {
              playerStatePizza.hp = combatant.hp;
              playerStatePizza.xp = combatant.xp;
              playerStatePizza.maxXp = combatant.maxXp;
              playerStatePizza.level = combatant.level;
            }
          });

          //Get rid of player used items
          playerState.items = playerState.items.filter((item) => {
            return !this.usedInstanceIds[item.instanceId];
          });

          //add victory rewards
          const {
            items,
            currency,
            ingredients: enemyIngredients,
          } = this.enemy.rewards;
          //if there are reward items, push them into player state
          if (items) {
            items.forEach((item) => {
              playerState.items.push({
                actionId: item,
                instanceId: `item${new Date()}`,
              });
            });
            //notify the player
            await new Promise((resolve) => {
              const battleEvent = new BattleEvent(
                {
                  type: "textMessage",
                  text: `Gained ${items
                    .map((item) => Actions[item].name)
                    .join(", ")}`,
                },
                this
              );
              battleEvent.init(resolve);
            });
          }
          //Add Currency to player state
          if (currency) {
            playerState.currency += currency;
            await new Promise((resolve) => {
              const battleEvent = new BattleEvent(
                {
                  type: "textMessage",
                  text: `Gained $$$${currency}`,
                },
                this
              );
              battleEvent.init(resolve);
            });
          }
          //add ingredients to player state
          if (enemyIngredients) {
            enemyIngredients.forEach((item) => {
              playerState.ingredients.push({
                indexId: item,
                instanceId: `ingred${new Date()}`,
              });
            });
            await new Promise((resolve) => {
              const battleEvent = new BattleEvent(
                {
                  type: "textMessage",
                  text: `Gained ${enemyIngredients.join(", ")}`,
                },
                this
              );
              battleEvent.init(resolve);
            });
          }

          utils.emitEvent("PlayerStateUpdated");
        }

        this.element.remove();
        this.onComplete(winner === "player" ? true : false);
      },
    });

    this.turnCycle.init();
  }
}
