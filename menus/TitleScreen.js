class TitleScreen {
  constructor({ progress }) {
    this.progress = progress;
  }

  getOptions(resolve) {
    const safeFile = this.progress.getSaveFile();
    return [
      {
        label: "New Game",
        description: "Start a new pizza adventure!",
        handler: () => {
          this.close();
          resolve();
        },
      },
      safeFile
        ? {
            label: "Continue Game",
            description: "Resume your adventure",
            handler: () => {
              this.close();
              resolve(safeFile);
            },
          }
        : null,
    ].filter((v) => v);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TitleScreen");
    this.element.innerHTML = `
      <img class="TitleScreen_logo" src="/images/new_logo.png" alt="Pizza Legends" />
    `;
    this.subElement = document.createElement("div");
    this.subElement.classList.add("menuContainer");
    this.subElement.innerHTML = `
      <img class="TitleScreen_logo_sprite" src="/images/logo_sprite.png" alt="Buster Paddle" />
    `;
  }

  close() {
    this.keyboardMenu.end();
    this.element.remove();
  }

  init(container) {
    return new Promise((resolve) => {
      this.createElement();
      container.appendChild(this.element);
      this.element.appendChild(this.subElement);
      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(this.subElement);
      this.keyboardMenu.setOptions(this.getOptions(resolve));
    });
  }
}
