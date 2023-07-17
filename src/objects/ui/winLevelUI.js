import { Container, Text, TextStyle } from "pixi.js";
import { Game } from "../../game";

export const WinLevelUIEvent = Object.freeze({
    ButtonRestartClicked: "winlevelevent:restartbutton",
    ButtonNextClicked: "winlevelevent:nextbutton"
});

export class WinLevelUI extends Container {
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

        this.nextMess = new Text("Next Level", this.styleButton);
        this.nextMess.interactive = true;
        this.nextMess.cursor = "pointer";
        this.addChild(this.nextMess);

        this.visible = false;

        this.restartMess.on("pointerdown", () => {
            this.emit(WinLevelUIEvent.ButtonRestartClicked);
        });

        this.nextMess.on("pointerdown", () => {
            this.emit(WinLevelUIEvent.ButtonNextClicked);
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

        this.restartMess.x = Game.windowWidth / 2 - this.restartMess.width / 2;
        this.restartMess.y = this.nameGame.y + 100;

        this.nextMess.x = Game.windowWidth / 2 - this.nextMess.width / 2;
        this.nextMess.y = this.restartMess.y + 100;
    }
}