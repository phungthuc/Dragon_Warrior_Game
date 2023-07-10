import { Application, Assets, Sprite } from "pixi.js";
import { GameConstant } from "./gameConstant";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";
        this.resize(window.innerWidth, window.innerHeight);

    }

    static resize(width, height) {
        let style = this.app.view.style;
        this.windowWidth = width;
        this.windowHeight = height;
        let ratio = Math.max(GameConstant.GAME_WIDTH / this.windowWidth, GameConstant.GAME_HEIGHT / this.windowHeight);
        this.width = this.windowWidth * ratio;
        this.height = this.windowHeight * ratio;
        this.app.view.width = this.width;
        this.app.view.height = this.height;
        let scale = this.windowWidth / this.width;
        style.transformOrigin = "0px 0px";
        style.transform = `scale(${scale})`;
        let vMargin = Math.floor((this.windowWidth - this.width * scale) / 2);
        let hMargin = Math.floor((this.windowHeight - this.height * scale) / 2);

        style.margin = `${hMargin}px ${vMargin}px ${hMargin}px ${vMargin}px`;
        this.app.resizeTo = this.app.view;
        this.app.resize();

        this.playScene && this.playScene.resize();
    }
}

window.onload = function () {
    Game.init();
}
