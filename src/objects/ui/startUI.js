import { Container, Text, TextStyle } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Game } from "../../game";

export const StartUIEvent = Object.freeze({
    ButtonClicked: "playuievent:clicked"
});

export class StartUI extends Container {
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

        this.startMess = new Text("Start", this.styleButton);
        this.startMess.interactive = true;
        this.startMess.cursor = "pointer";
        this.addChild(this.startMess);

        this.visible = false;

        this.startMess.on("pointerdown", () => {
            this.emit(StartUIEvent.ButtonClicked);
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
        this.nameGame.x = Game.windowWidth / 2 - this.nameGame.width / 2;
        this.nameGame.y = Game.windowHeight / 3;
        this.startMess.x = Game.windowWidth / 2 - this.startMess.width / 2;
        this.startMess.y = this.nameGame.y + 100;
    }
}