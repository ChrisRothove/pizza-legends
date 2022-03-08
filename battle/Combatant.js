class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.battle = battle;
    this.hp = typeof this.hp === "undefined" ? this.maxHp : this.hp;
  }

  //GETTERS
  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return (
      ((this.xp - levels[this.level]) / (this.maxXp - levels[this.level])) * 100
    );
  }

  get isActive() {
    return this.battle?.activeCombatants[this.team] === this.id;
  }

  get givesXp() {
    return this.level * 20;
  }

  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    this.hudElement.innerHTML = `
      <p class="Combatant_name">${this.name}</p>
      <p class="Combatant_level"></p>
      <div class="Combatant_character_crop">
        <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
      </div>
      <img class="Combatant_type" alt="${this.type}" src="${this.icon}"/> 
      <svg viewBox="0 0 26 3" class="Combatant_life-container">
        <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
        <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
      </svg>
      <svg viewBox="0 0 26 2" class="Combatant_xp-container">
        <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
        <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
      </svg>
      <p class="Combatant_status"></p>
    `;

    this.pizzaElement = document.createElement("img");
    this.pizzaElement.classList.add("Pizza");
    this.pizzaElement.setAttribute("src", this.src);
    this.pizzaElement.setAttribute("alt", this.name);
    this.pizzaElement.setAttribute("data-team", this.team);

    this.hpFills = this.hudElement.querySelectorAll(
      ".Combatant_life-container > rect"
    );

    this.xpFills = this.hudElement.querySelectorAll(
      ".Combatant_xp-container > rect"
    );
  }

  update(changes = {}) {
    //update anything incoming
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    // update HP and XP bar fills
    this.hpFills.forEach((rect) => (rect.style.width = `${this.hpPercent}%`));
    this.xpFills.forEach((rect) => (rect.style.width = `${this.xpPercent}%`));

    // update level display
    this.hudElement.querySelector(".Combatant_level").innerText = this.level;

    // update active flags for pizza and hud
    this.hudElement.setAttribute("data-active", this.isActive);
    this.pizzaElement.setAttribute("data-active", this.isActive);

    //update Status
    const statusElement = this.hudElement.querySelector(".Combatant_status");
    if (this.status) {
      statusElement.innerText = this.status.type;
      statusElement.style.display = "block";
    } else {
      statusElement.innerText = "";
      statusElement.style.display = "none";
    }
  }

  getReplacedEvents(originalEvents) {
    if (
      this.status?.type === "clumsy" &&
      utils.randomFromArray([true, false, false])
    ) {
      return [{ type: "textMessage", text: `${this.name} flops over!` }];
    }

    if (this.status?.frozen) {
      return [{ type: "textMessage", text: `${this.name} is frozen solid!` }];
    }

    return originalEvents;
  }

  getPostEvents() {
    //ailments
    if (this.status?.type === "saucy") {
      return [
        { type: "textMessage", text: "Feelin' Saucy!" },
        { type: "stateChange", recover: 5, onCaster: true },
      ];
    }

    //Stat buffs
    if (this.status?.type === "attack+") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", statDown: { stat: "atk", value: 5 } },
      ];
    }
    if (this.status?.type === "defense+") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", statDown: { stat: "def", value: 5 } },
      ];
    }
    if (this.status?.type === "speed+") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", statDown: { stat: "spd", value: 5 } },
      ];
    }

    return [];
  }

  getPreEvents() {
    //Ailments
    if (this.status?.type === "kaled") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", dot: 15 },
      ];
    }

    if (this.status?.type === "tabasco") {
      return [
        { type: "textMessage", text: `${this.name} is on fire!` },
        { type: "stateChange", dot: 10, onCaster: true },
      ];
    }

    //Stat Buffs
    if (this.status?.type === "attack+") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", statUp: { stat: "atk", value: 5 } },
      ];
    }
    if (this.status?.type === "defense+") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", statUp: { stat: "def", value: 5 } },
      ];
    }
    if (this.status?.type === "speed+") {
      return [
        { type: "textMessage", text: `${this.name} is hurt by kale!` },
        { type: "stateChange", statUp: { stat: "spd", value: 5 } },
      ];
    }
    return [];
  }

  decrementStatus() {
    const type = this.status?.type || "";
    if (this.status?.expiresIn > 0) {
      this.status.expiresIn -= 1;
      if (this.status.expiresIn === 0) {
        this.update({
          status: null,
        });
        return {
          type: "textMessage",
          text: `${type.toUpperCase()} Expired!`,
        };
      }
    }

    return null;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.pizzaElement);
    this.update();
  }
}
