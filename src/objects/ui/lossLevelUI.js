import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";

export const LossLevelUIEvent = Object.freeze({
    ButtonClicked: "losslevelevent:clicked"
});

export class LossLevelUI extends Container {
    constructor() {
        super();

        this._init();
        this._initScore();
        this.resize();
    }

    _init() {
        this.styleName = new TextStyle({
            fill: "#022c6e",
            fontFamily: "Times New Roman",
            fontSize: 40,
            fontWeight: 600
        });

        this.styleButton = new TextStyle({
            fill: "#099036",
            fontFamily: "Times New Roman",
            fontSize: 40,
            fontWeight: 600
        });

        this.nameGame = new Text("Dragon Warrior", this.styleName);
        this.addChild(this.nameGame);

        this.restartMess = new Text("Restart", this.styleButton);
        this.restartMess.interactive = true;
        this.restartMess.cursor = "pointer";
        this.addChild(this.restartMess);

        this.visible = false;

        this.restartMess.on("pointerdown", () => {
            this.emit(LossLevelUIEvent.ButtonClicked);
        });
    }

    _initScore() {

    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    resize() {
        this.nameGame.x = Game.width / 2 - this.nameGame.width / 2;
        this.nameGame.y = Game.height / 3;
        this.restartMess.x = Game.width / 2 - this.restartMess.width / 2;
        this.restartMess.y = this.nameGame.y + GameConstant.SCALE_DISTANCE_MESS * Game.ratioHeight;
    }
}