class StatPanel {
  constructor({ id }) {
    this.id = id;
    this.subject = id === 0 ? playerState : playerState.pizzas[id];
  }

  setPanel(newSubject = 0, addOns = null) {
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
    } else if (this.id && typeof this.id === "string") {
      this.subject = { ...Pizzas[this.id] };
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
      this.subject.maxHp = this.subject.attributes.vit * 10;
      this.subject.hp = this.subject.attributes.vit * 10;
      this.subject.stats = {};
      this.subject.stats.vit = this.subject.attributes.vit;
      this.subject.stats.atk = this.subject.attributes.atk;
      this.subject.stats.def = this.subject.attributes.def;
      this.subject.stats.spd = this.subject.attributes.spd;
      this.subject.actions = [...Pizzas[this.id].actions];

      if (addOns) {
        addOns.forEach((addOn) => {
          addOn.effect(this.subject);
        });
      }

      this.element.innerHTML = `
        <h2>${this.subject.name}</h2>
        <h4>${this.subject.description}</h4>
        <table class="stats">
        <tr>
          <td class="head"><strong>Hit Points</strong></td>
          <td><em>${this.subject.maxHp}</em></td>
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
          <td><em>${this.subject.stats.vit}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.vitRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Attack</strong></td>
          <td><em>${this.subject.stats.atk}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.atkRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Defense</strong></td>
          <td><em>${this.subject.stats.def}</em></td>
          <td class="head"><strong>Growth Rate</strong></td>
          <td><em>level/${this.subject.attributes.defRate}</em></td>
        </tr>
        <tr>
          <td class="head"><strong>Speed</strong></td>
          <td><em>${this.subject.stats.spd}</em></td>
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
        ${
          addOns
            ? `<tr>
          <td class="head"><strong>Addons</strong></td>
          <td><em>${addOns[0]?.name || "None"}</em></td>
          <td class="alone"><em>${addOns[1]?.name || "None"}</em></td>
          <td class="alone"><em>${addOns[2]?.name || "None"}</em></td>
        </tr>`
            : ""
        }
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
    } else if (this.id === 0) {
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
    } else if (this.id === 1) {
      this.element.innerHTML = `
      <h2>Recipes</h2>
        <table class="stats">
            ${Object.keys(recipes)
              .map((recipeId) => {
                const recipe = recipes[recipeId];
                console.log(recipe.ingredients[0]);
                const ingredient1 = {
                  ...ingredients[recipe.ingredients[0]],
                  count: playerState.ingredients.filter(
                    (ing) =>
                      ingredients[recipe.ingredients[0]].name === ing.indexId
                  ).length,
                };
                const ingredient2 = {
                  ...ingredients[recipe.ingredients[1]],
                  count: playerState.ingredients.filter(
                    (ing) =>
                      ingredients[recipe.ingredients[1]].name === ing.indexId
                  ).length,
                };
                const ingredient3 = {
                  ...ingredients[recipe.ingredients[2]],
                  count: playerState.ingredients.filter(
                    (ing) =>
                      ingredients[recipe.ingredients[2]].name === ing.indexId
                  ).length,
                };
                return `
              <tr>
                <td class="head">${recipe.label}</td>
                <td><div class="divided"><em>${ingredient1.name}</em><span>${ingredient1.count}</span></div></td>
                <td class="alone"><div class="divided"><em>${ingredient2.name}</em><span>${ingredient2.count}</span></div></td>
                <td class="alone"><div class="divided"><em>${ingredient3.name}</em><span>${ingredient3.count}</span></div></td>
              </tr>
            `;
              })
              .join("")}
              <tr>
                <td colSpan="4" class="banner divider"><h4>Add-ons</h4></td>
              </tr>
              <tr>
                <td class="alone">${playerState.addOns[0] || "???"}</td>
                <td class="alone">${playerState.addOns[1] || "???"}</td>
                <td class="alone">${playerState.addOns[2] || "???"}</td>
                <td class="alone">${playerState.addOns[3] || "???"}</td>
              </tr>
              <tr>
                <td class="alone">${playerState.addOns[4] || "???"}</td>
                <td class="alone">${playerState.addOns[5] || "???"}</td>
                <td class="alone">${playerState.addOns[6] || "???"}</td>
                <td class="alone">${playerState.addOns[7] || "???"}</td>
              </tr>
        </table>
      `;
    }
    return this.subject;
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
