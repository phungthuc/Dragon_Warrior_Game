import { Container } from "pixi.js";
import { UIManager, UIManagerKey } from "../objects/ui/UIManager";
import { GameState } from "./gameState";
import { PipeManager } from "../objects/pipe/pipeManager";
import data from "../../assets/levels/level.json"
import { LevelLoader } from "../level/levelLoader";

export class PlayScene extends Container {
    constructor() {
        super();

        this.currentLevel = 1;
        this.dataLoaded = {};
        this.gameState = GameState.Start;

        this._loadLevel();
        this._initInputHandler();
        this._initUI();
        this._initGameplay();
    }

    _loadLevel() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.dataLoaded = this.levelLoader.getData();
    }

    _initInputHandler() {

    }

    _onKeyup() {

    }

    _onMouseUp() {

    }

    _initGameplay() {
        this._initPipes();
    }

    _initUI() {
        this.uIManager = new UIManager();
        this.addChild(this.uIManager);
        this.uIManager.show(GameState.Start);

        this.uIManager.on(UIManagerKey.Playing, () => {
            this.uIManager.show(GameState.Playing);
            this.gameState = GameState.Playing;
        });
    }

    _initDragon() {

    }

    _initBoss() {

    }

    _initPipes() {
        this.pipeManager = new PipeManager(this.dataLoaded.pipes);
        this.addChild(this.pipeManager);
    }

    _onEnemyRemoved() {

    }

    update(delta) {
        if (this.gameState === GameState.Playing) {
            this.pipeManager.update(delta);
        }
    }

    resize() {
        this.uIManager.resize();
        if (this.state === GameState.Playing) {
            return;
        }
    }

    _onStart() {

    }

    _onEnd() {

    }

    _onStop() {

    }
}