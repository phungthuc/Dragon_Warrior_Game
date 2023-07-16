import { Container } from "pixi.js";
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
        this._initGameplay();
    }

    _loadLevel() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.levelData = this.levelLoader.getData();

        this.level = new LevelManager();
        this.level.loadLevel(this.levelData);

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

        this.uIManager.on(UIManagerKey.Playing, () => {
            this.uIManager.show(GameState.Playing);
            this._onStart();
            this.gameState = GameState.Playing;
        });
    }

    _onEnemyRemoved() {

    }

    update(delta) {
        if (this.gameState === GameState.Playing) {
            CollisionDetector.instance.update(delta);
            this.level.update(delta);
        }
    }

    _onStart() {
        this.gamePlay.visible = true;
    }

    _onStop() {

    }

    _onEnd() {

    }
}
