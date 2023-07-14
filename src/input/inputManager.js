import { utils } from "pixi.js";

export class InputManager {

    static init() {
        this.emitter = new utils.EventEmitter();
        this._registerDOMEvents();
    }

    static _registerDOMEvents() {
        window.addEventListener("mouseup", this._mouseUpEventHandler.bind(this), false);
        window.addEventListener("keyup", this._keyUpEventHandle.bind(this), false);
    }

    static _mouseUpEventHandler(e) {
        if (e.which == 1) {
            this.emitter.emit(InputEvent.MouseUp);
        }
    }

    static _keyUpEventHandle(e) {
        if (e.keyCode == 32) {
            this.emitter.emit(InputEvent.SpaceUp);
        }
    }
}

export const InputEvent = Object.freeze({
    SpaceUp: "spaceup",
    MouseUp: "mouseup"
});  