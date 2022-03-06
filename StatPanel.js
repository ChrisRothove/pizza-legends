class StatPanel {
  constructor({ id }) {
    this.id = id;
    this.subject = id === 0 ? playerState : playerState.pizzas[id];
  }

  setPanel(newSubject = 0) {
    this.id = newSubject;
    this.subject = !newSubject ? playerState : playerState.pizzas[this.id];
    if (this.id) {
      // render for Pizza
      this.element.innerHTML = `
        <h2>${this.subject.name}</h2>
        <h4>${this.subject.description}</h4>
        <table class="stats">
        <tr>
          <td class="head"><strong>Hit Points</strong></td>
          <td><em>${this.subject.hp}</em></td>
          <td class="head"><strong>Max HP</strong></td>
          <td><em>${this.subject.maxHp}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Weak</strong></td>
          <td><em>${this.subject.typeWeak || "None"}</em></td>
          <td class="head"><strong>Resist</strong></td>
          <td><em>${this.subject.typeAdv || "None"}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Vitality</strong></td>
          <td><em>${this.subject.stats.vit}</em></td>
          <td class="head"><strong>Base</strong></td>
          <td><em>${this.subject.attributes.vit}</em></td>
        </tr>
        <tr>
          <td colSpan="4" class="banner"><em><strong> Vitality Growth Rate:</strong> level/${
            this.subject.attributes.vitRate
          }</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Attack</strong></td>
          <td><em>${this.subject.stats.atk}</em></td>
          <td class="head"><strong>Base</strong></td>
          <td><em>${this.subject.attributes.atk}</em></td>
        </tr>
        <tr>
          <td colSpan="4" class="banner"><em><strong>Attack Growth Rate:</strong> level/${
            this.subject.attributes.atkRate
          }</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Defense</strong></td>
          <td><em>${this.subject.stats.def}</em></td>
          <td class="head"><strong>Base</strong></td>
          <td><em>${this.subject.attributes.def}</em></td>
        </tr>
        <tr>
          <td colSpan="4" class="banner"><em><strong>Defense Growth Rate:</strong> level/${
            this.subject.attributes.defRate
          }</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Speed</strong></td>
          <td><em>${this.subject.stats.spd}</em></td>
          <td class="head"><strong>Base</strong></td>
          <td><em>${this.subject.attributes.spd}</em></td>
        </tr>
        <tr>
          <td colSpan="4" class="banner"><em><strong>Speed Growth Rate:</strong> level/${
            this.subject.attributes.spdRate
          }</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Addons</strong></td>
          <td><em>${this.subject.addOns[0] || "None"}</em></td>
          <td class="alone"><em>${this.subject.addOns[1] || "None"}</em></td>
          <td class="alone"><em>${this.subject.addOns[2] || "None"}</em></td>
        </tr>
        </table>
      `;
    } else {
      // render for player
      this.element.innerHTML = `
        <h2>${this.subject.name} | Level ${this.subject.pizzaLevel}</h2>
        <div class="row statLine">
          <p><strong>Exp</strong><em>${this.subject.pizzaExp}</em></p>
          <p><strong>Next Level</strong><em>${
            levels[this.subject.pizzaLevel + 1]
          }</em></p>
        </div>
      `;
    }
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("statPanel");
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
