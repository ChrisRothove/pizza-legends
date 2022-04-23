class TextMessage {
  constructor({ text, onComplete, speaker, name }) {
    this.text = text;
    this.onComplete = onComplete;
    this.speaker = speaker;
    this.name = name;
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
    <div class="${this.speaker ? "speaker" : ""}">
      <div class="head">${
        this.speaker
          ? `<img src="/images/characters/people/${this.speaker || ""}.png"/>`
          : ""
      }
      </div>
      <div class="${this.name ? "name" : ""}">${this.name || ""}</div>
    </div>
    <div>
      <p class="TextMessage_p"></p>
      <button class="TextMessage_button">Next</button>
    </div>
    `;

    this.revealingText = new RevealingText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text,
    });

    this.element.querySelector("button").addEventListener("click", () => {
      //close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
