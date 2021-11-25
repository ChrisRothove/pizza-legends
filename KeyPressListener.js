class KeyPressListener {
  constructor(keycode, callback) {
    let keySafe = true;
    this.keydownFunction = function (event) {
      if (event.code === keycode) {
        if (keySafe) {
          keySafe = false;
          callback();
        }
      }
    };
    this.keyupFunction = function (event) {
      if (event.code === keycode) {
        keySafe = true;
      }
    };
    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
