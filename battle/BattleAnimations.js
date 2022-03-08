window.BattleAnimations = {
  async spin(event, onComplete) {
    const element = event.caster.pizzaElement;
    const animationClassName =
      event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
    element.classList.add(animationClassName);

    //remove class when animation is complete
    element.addEventListener(
      "animationend",
      () => {
        element.classList.remove(animationClassName);
      },
      { once: true }
    );

    //continue battle cycle right around the time of impact
    await utils.wait(100);
    onComplete();
  },

  async glob(event, onComplete) {
    const { caster } = event;
    let div = document.createElement("div");
    div.classList.add("glob-orb");
    div.classList.add(
      caster.team === "player" ? "battle-glob-right" : "battle-glob-left"
    );

    div.innerHTML = `
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="${event.color}" />
    </svg>
    `;
    //Remove after completion
    div.addEventListener("animationend", () => {
      div.remove();
    });

    document.querySelector(".Battle").appendChild(div);

    await utils.wait(820);
    onComplete();
  },

  async blast(event, onComplete) {
    const { caster } = event;
    const elements = [];
    while (elements.length < 6) {
      elements.push(document.createElement("div"));

      const element = elements[elements.length - 1];
      const team = caster.team === "player" ? "right" : "left";

      element.classList.add("battle-blast");
      element.classList.add(`blast-particle-${team}-${elements.length}`);

      element.innerHTML = `
      <svg viewBox="0 0 3 3" width="3" height="3">
      <circle cx="1" cy="1" r="1" fill="${event.color}" />
      </svg>
      `;

      //Remove after completion
      element.addEventListener("animationend", () => {
        element.remove();
      });

      document.querySelector(".Battle").appendChild(element);
    }

    await utils.wait(820);
    onComplete();
  },

  async buff(event, onComplete) {
    const element = event.caster.pizzaElement;
    element.classList.add("battle-buff");

    //remove class when animation is complete
    element.addEventListener(
      "animationend",
      () => {
        element.classList.remove("battle-buff");
      },
      { once: true }
    );

    //continue battle cycle right around the time of impact
    await utils.wait(100);
    onComplete();
  },
};
