class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);

    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const {
      caster,
      target,
      damage,
      recover,
      status,
      dot,
      statUp,
      statDown,
      hit = () => true,
      action,
    } = this.event;

    let who = this.event.onCaster ? caster : target;

    if (damage) {
      //determine if the attack hit
      const isHit = hit(caster.stats.spd, target.stats.spd);
      if (isHit === false) {
        //if the hit missed, send a message instead
        this.event.text = `${caster.name} missed!`;
        return this.textMessage(resolve);
      }
      // modify the target's HP
      target.update({
        hp: target.hp - (damage(caster.stats.atk) - target.stats.def),
      });
      //start blinking
      target.pizzaElement.classList.add("battle-damage-blink");
    }

    if (recover) {
      let newHp = who.hp + recover;
      if (newHp > who.maxHp) {
        newHp = who.maxHp;
      }
      who.update({
        hp: newHp,
      });
    }

    if (dot) {
      let newHp = who.hp - dot;
      if (newHp < 0) newHp = 0;
      who.update({
        hp: newHp,
      });

      //start blinking
      who.pizzaElement.classList.add("battle-damage-blink");
    }

    if (status) {
      who.update({
        status: { ...status },
      });
    }
    if (status === null) {
      who.update({
        status: null,
      });
    }

    if (statUp) {
      caster.stats[statUp.stat] += statUp.value;
    }

    if (statDown) {
      caster.stats[statDown.stat] += statDown.value;
    }

    //wait a little bit
    await utils.wait(600);

    this.battle.playerTeam.update();
    this.battle.enemyTeam.update();
    //stop blinking
    who.pizzaElement.classList.remove("battle-damage-blink");

    resolve();
  }

  submissionMenu(resolve) {
    const { caster } = this.event;
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      items: this.battle.items,
      replacements: Object.values(this.battle.combatants).filter((c) => {
        return c.id !== caster.id && c.team === caster.team && c.hp > 0;
      }),
      onComplete: (submission) => {
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  replacementMenu(resolve) {
    const menu = new ReplacementMenu({
      replacements: Object.values(this.battle.combatants).filter((c) => {
        return c.team === this.event.team && c.hp > 0;
      }),
      onComplete: (replacement) => {
        resolve(replacement);
      },
    });
    menu.init(this.battle.element);
  }

  async replace(resolve) {
    const { replacement } = this.event;

    //Clear out the old combatant
    const prevCombatant =
      this.battle.combatants[this.battle.activeCombatants[replacement.team]];
    this.battle.activeCombatants[replacement.team] = null;
    prevCombatant.update();
    await utils.wait(400);

    //In with the new!
    this.battle.activeCombatants[replacement.team] = replacement.id;
    replacement.update();
    await utils.wait(400);

    //update Team components
    this.battle.playerTeam.update();
    this.battle.enemyTeam.update();

    resolve();
  }

  giveXp(resolve) {
    let amount = this.event.xp;
    const { combatant, playerActivePizzaId } = this.event;
    const pizza = playerState.pizzas[playerActivePizzaId];
    const step = () => {
      if (amount > 0) {
        amount -= 1;
        combatant.xp += 1;
        pizza.xp += 1;

        //Check if we've hit level up point
        if (combatant.xp === combatant.maxXp) {
          // level up player Pizza
          playerState.levelUpPizza(playerActivePizzaId);
          // apply changes to combatant
          Object.keys(pizza).forEach((key) => {
            combatant[key] = pizza[key];
          });
          console.log(playerState.pizzas[playerActivePizzaId], combatant);
        }

        combatant.update();
        requestAnimationFrame(step);
        return;
      }
      resolve();
    };
    requestAnimationFrame(step);
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
