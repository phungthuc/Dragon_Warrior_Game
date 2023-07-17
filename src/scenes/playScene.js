import { Container, Text, TextStyle } from "pixi.js";
import { UIManager, UIManagerKey } from "../objects/ui/UIManager";
import { GameState } from "./gameState";
import data from "../../assets/levels/level.json"
import { LevelLoader } from "../level/levelLoader";
import CollisionDetector from "../physics/collision/collisionDetector";
import { LevelManager } from "../level/levelManager";

export class PlayScene extends Container {
    constructor() {
        super();

        this.currentLevel = 1;
        this.levelData = {};
        this.gameState = GameState.Start;

        this._loadLevel();
        this._initUI();
        this._initEmitter();
        this._initGameplay();

        this.styleName = new TextStyle({
            fill: "#022c6e",
            fontFamily: "Times New Roman",
            fontSize: 40,
            fontWeight: 600
        });

        this.nameGame = new Text("Level: " + this.currentLevel, this.styleName);
        this.addChild(this.nameGame);
    }

    _loadLevel() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.levelData = this.levelLoader.getData();

        this.level = new LevelManager();
        this.level.loadLevel(this.levelData);
        this.level.on(GameState.LossLevel, this._onStopLoss, this);
        this.level.on(GameState.WinLevel, this._onStopWin, this);
    }

    createLevel() {
        this._loadLevel();
        this._initGameplay();
    }

    _onKeyup() {

    }

    _onMouseUp() {

    }

    _initGameplay() {
        this.gamePlay = new Container();
        this.gamePlay.visible = false;
        this.gamePlay.addChild(this.level);
        this.addChild(this.gamePlay);
    }

    _initUI() {
        this.uIManager = new UIManager();
        this.addChild(this.uIManager);
        this.uIManager.show(GameState.Start);
    }

    _initEmitter() {
        this.uIManager.on(UIManagerKey.Playing, () => {
            this.uIManager.show(GameState.Playing);
            this._onStart();
            this.gameState = GameState.Playing;
        });

        this.uIManager.on(UIManagerKey.Replaying, () => {
            this.level.reset();
            this.uIManager.show(GameState.Playing);
            this.createLevel();
            this._onStart();
            this.gameState = GameState.Playing;
        });

        this.uIManager.on(UIManagerKey.NextPlaying, () => {
            if (this.currentLevel < 3) {
                this.currentLevel += 1;
                this.level.reset();
                this.uIManager.show(GameState.Playing);
                this.createLevel();
                this._onStart();
                this.gameState = GameState.Playing;
            }
        });
    }

    update(delta) {
        this.nameGame.text = "Level: " + this.currentLevel;
        if (this.gameState === GameState.Playing) {
            CollisionDetector.instance.update(delta);
            this.level.update(delta);
        }
    }

    _onStart() {
        this.gamePlay.visible = true;
        this.uIManager.show(GameState.Playing);
    }

    _onStopLoss() {
        this.gamePlay.visible = false;
        this.uIManager.show(GameState.LossLevel);
    }

    _onStopWin() {
        this.gamePlay.visible = false;
        this.uIManager.show(GameState.WinLevel);
    }

    _onEnd() {

    }
}
