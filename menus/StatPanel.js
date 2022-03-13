class StatPanel {
  constructor({ id }) {
    this.id = id;
    this.subject = id === 0 ? playerState : playerState.pizzas[id];
  }

  setPanel(newSubject = 0) {
    this.id = newSubject;
    this.subject = !newSubject ? playerState : playerState.pizzas[this.id];
    if (this.id && Object.keys(playerState.pizzas).includes(this.id)) {
      // render for Pizza in Pause Menu
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
    } else if (this.id) {
      this.subject = Pizzas[this.id];
      // render for Pizza in creation menu
      this.activeIngredients = playerState.ingredients.filter((ingred) => {
        return recipes[this.id].ingredients.includes(ingred.indexId);
      });
      console.log(this.activeIngredients);
      // create ingredient 1 object
      this.ingredient1 = {
        name: recipes[this.subject.pizzaId].ingredients[0],
      };
      this.ingredient1.value = this.activeIngredients.filter(
        (ing) => ing.indexId === this.ingredient1.name
      );
      // ingredient 2 object
      this.ingredient2 = {
        name: recipes[this.subject.pizzaId].ingredients[1],
      };
      this.ingredient2.value = this.activeIngredients.filter(
        (ing) => ing.indexId === this.ingredient2.name
      );
      // ingredient 3 object
      this.ingredient3 = {
        name: recipes[this.subject.pizzaId].ingredients[2],
      };
      this.ingredient3.value = this.activeIngredients.filter(
        (ing) => ing.indexId === this.ingredient3.name
      );

      this.element.innerHTML = `
        <h2>${this.subject.name}</h2>
        <h4>${this.subject.description}</h4>
        <table class="stats">
        <tr>
          <td class="head"><strong>Hit Points</strong></td>
          <td><em>${this.subject.attributes.vit * 10}</em></td>
          <td class="head"><strong>Type</strong></td>
          <td><em>${this.subject.type}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Weak</strong></td>
          <td><em>${this.subject.typeWeak || "None"}</em></td>
          <td class="head"><strong>Resist</strong></td>
          <td><em>${this.subject.typeAdv || "None"}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Vitality</strong></td>
          <td><em>${this.subject.attributes.vit}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.vitRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Attack</strong></td>
          <td><em>${this.subject.attributes.atk}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.atkRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Defense</strong></td>
          <td><em>${this.subject.attributes.def}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.defRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Speed</strong></td>
          <td><em>${this.subject.attributes.spd}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.spdRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>ingredients</strong></td>
          <td><em>${this.ingredient1.name}(${
        this.ingredient1.value.length
      })</em></td>
          <td class="alone"><em>${this.ingredient2.name}(${
        this.ingredient2.value.length
      })</em></td>
          <td class="alone"><em>${this.ingredient3.name}(${
        this.ingredient3.value.length
      })</em></td>
        </tr>
        <tr>
        <td colSpan="4" class="banner divider"><h4>Attacks</h4></td>
        </tr>
        <tr>
          ${this.subject.actions
            .map(
              (action) =>
                `<td class="alone"><em>${Actions[action].name}</em></td>`
            )
            .join("")}
        </tr>
        </table>
      `;
    } else {
      // render for player
      const lineup = this.subject.lineup;
      const reserve = Object.keys(this.subject.pizzas).filter(
        (item) => !this.subject.lineup.includes(item)
      );
      this.element.innerHTML = `
        <h2>${this.subject.name} | Level ${this.subject.pizzaLevel}</h2>
        <table class="stats">
        <tr>
          <td class="head"><strong>Exp</strong></td>
          <td><em>${this.subject.pizzaExp}</em></td>
          <td class="head"><strong>Next Level</strong></td>
          <td><em>${levels[this.subject.pizzaLevel + 1]}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>$$$</strong></td>
          <td><em>${this.subject.currency}</em></td>
          <td class="head"><strong>Recipes</strong></td>
          <td><em>${this.subject.recipes.length} / ${
        Object.keys(recipes).length
      }</em></td>
        </tr>
        <tr>
        <td colSpan="2" class="banner divider"><h4>Active Pizzas</h4></td>
        <td colSpan="2" class="banner divider"><h4>Reserve Pizzas</h4></td>
        </tr>
        ${[0, 1, 2]
          .map((idx) => {
            const thePizza = this.subject.pizzas[lineup[idx]];
            const theReserve = this.subject.pizzas[reserve[idx]];
            console.log(thePizza, theReserve);
            return `
              <tr>
                <td class="head pizzaBox">
                  ${thePizza ? `<img src="${thePizza.src}" />` : `Empty`}
                </td>
                <td><em>${thePizza?.name || "Empty"}</em></td>

                <td class="head pizzaBox">
                  ${theReserve ? `<img src="${theReserve.src}" />` : `Empty`}
                </td>
                <td><em>${theReserve?.name || "Empty"}</em></td>
              </tr>
              <tr>
                <td class="banner hp" colSpan="2">
                  <div style="height: 1em; width: ${
                    (thePizza?.hp / thePizza?.maxHp) * 100 || 0
                  }%; background: lightgreen;" />
                </td>
                <td class="banner hp" colSpan="2">
                  <div style="height: 1em; width: ${
                    (theReserve?.hp / theReserve?.maxHp) * 100 || 0
                  }%; background: lightgreen;" />
                </td>
              </tr>
              <tr>
                <td colSpan="4" class="banner divider"> </td>
              </tr>
            `;
          })
          .join("")}
        </table>
      `;
    }
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("statPanel");
  }

  end() {
    this.element.remove();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
