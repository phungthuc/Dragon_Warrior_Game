import { Container } from "pixi.js";
import { UIManager, UIManagerKey } from "../objects/ui/UIManager";
import { GameState } from "./gameState";
import { PipeManager } from "../objects/pipe/pipeManager";
import data from "../../assets/levels/level.json"
import { LevelLoader } from "../level/levelLoader";
import { Level } from "../level/level";

export class PlayScene extends Container {
    constructor() {
        super();

        this.currentLevel = 1;
        this.levelData = {};
        this.gameState = GameState.Start;

        this._loadLevel();
        this._initInputHandler();
        this._initUI();
        this._initGameplay();
    }

    _loadLevel() {
        this.dataLevel = data[this.currentLevel - 1];
        this.levelLoader = new LevelLoader(this.dataLevel);
        this.levelData = this.levelLoader.getData();

        this.level = new Level();
        this.addChild(this.level);
        console.log(this.levelData);
        this.level.loadLevel(this.levelData);
    }

    _initInputHandler() {

    }

    _onKeyup() {

    }

    _onMouseUp() {

    }

    _initGameplay() {
        this.gamePlay = new Container();
        this.gamePlay.visible = false;
        this.addChild(this.gamePlay);
        this._initPipes();
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

    _initDragon() {

    }

    _initBoss() {

    }

    _initPipes() {
        // this.pipeManager = new PipeManager(this.levelData.pipes, this.levelData.numPipe);
        // this.gamePlay.addChild(this.pipeManager);
    }

    _onEnemyRemoved() {

    }

    update(delta) {
        if (this.gameState === GameState.Playing) {
            // this.pipeManager.update(delta);
        }
    }

    resize() {
        this.uIManager.resize();
        if (this.state === GameState.Playing) {
            return;
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
