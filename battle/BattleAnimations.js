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
};