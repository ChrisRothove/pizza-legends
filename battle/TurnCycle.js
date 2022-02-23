class TurnCycle {
  constructor({ battle, onNewEvent }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.currentTeam = "player";
  }

  async turn() {
    //caster
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];

    //enemy
    const enemyId =
      this.battle.activeCombatants[
        caster.team === "player" ? "enemy" : "player"
      ];
    const enemy = this.battle.combatants[enemyId];

    const submission = await this.onNewEvent({
      type: "submissionMenu",
      enemy: enemy,
      caster,
    });

    if (submission.instanceId) {
      this.battle.items = this.battle.items.filter(
        (i) => i.instanceId !== submission.instanceId
      );
    }

    //Stop here if we are replacing this Pizza
    if (submission.replacement) {
      await this.onNewEvent({
        type: "replace",
        replacement: submission.replacement,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: `Go get 'em, ${submission.replacement.name}!`,
      });
      this.nextTurn();
      return;
    }

    const resultingEvents = caster.getReplacedEvents(submission.action.success);

    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      };
      await this.onNewEvent(event);
    }

    //Did the target die?
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.onNewEvent({
        type: "textMessage",
        text: `${submission.target.name} is ruined!`,
      });
    }

    //Do we have a winning team?
    const winner = this.getWinningTeam();
    if (winner) {
      await this.onNewEvent({
        type: "textMessage",
        text: "Winner!",
      });
      //END THE BATTLE -> TODO
      return;
    }

    //We have a dead target, but still no winner, so bring in a replacement
    if (targetDead) {
      const replacement = await this.onNewEvent({
        type: "replacementMenu",
        team: submission.target.team,
      });
      await this.onNewEvent({
        type: "replace",
        replacement: replacement,
      });
      await this.onNewEvent({
        type: "textMessage",
        text: `${replacement.name} appears!`,
      });
    }

    //check for post events
    // happen after turn submission
    const postEvents = caster.getPostEvents();
    for (let i = 0; i < postEvents.length; i++) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      };
      await this.onNewEvent(event);
    }

    //check for Status Expired
    const expiredEvent = caster.decrementStatus();
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent);
    }

    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  nextTurn() {
    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
    this.turn();
  }

  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach((c) => {
      if (c.hp > 0) {
        aliveTeams[c.team] = true;
      }
    });
    if (!aliveTeams["player"]) {
      return "enemy";
    }
    if (!aliveTeams["enemy"]) {
      return "player";
    }
    return null;
  }

  async init() {
    // await this.onNewEvent({
    //   type: "textMessage",
    //   text: "The battle is starting!",
    // });

    //start the first turn
    this.turn();
  }
}
