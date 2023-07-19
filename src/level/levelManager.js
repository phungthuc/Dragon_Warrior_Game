import { Container } from "pixi.js";
import { ContainerSpawner } from "../spawners/containerSpawner";
import { PipeTop } from "../objects/pipe/pipeTop";
import { SpawningEvent } from "../spawners/spawner";
import { PipeBottom } from "../objects/pipe/pipeBottom";
import { Dragon, DragonEvent } from "../objects/dragon/dragonObject";
import { Boss } from "../objects/boss/bossObject";
import { GameState } from "../scenes/gameState";
import { Game } from "../game";

export class LevelManager extends Container {
    constructor() {
        super("level");

        this.dataDragonFire = {};
        this.dataBoss = {};
        this.dataBossFire = {};
        this.isDonePipe = false;

        this._initSpawner();
    }

    loadLevel(jsonData) {
        let pipeData = jsonData.pipes;
        this.dataDragonFire = jsonData.dragonFire;
        this.dataBoss = jsonData.boss;
        this.dataBossFire = jsonData.bossFire;

        pipeData.forEach(data => {
            let pipeTop = this.pipeTopSpawner.spawn(this);
            let pipeBottom = this.pipeBottomSpawner.spawn(this);

            pipeTop.x = data.x * Game.ratioWidth;
            pipeTop.y = data.yTop * Game.ratioHeight;
            pipeTop.width = data.width * Game.ratioWidth;
            pipeTop.height = data.height * Game.ratioHeight;
            pipeTop.v = data.velocity;
            pipeTop.health = data.health;

            pipeBottom.x = data.x * Game.ratioWidth;
            pipeBottom.y = data.yBottom * Game.ratioHeight;
            pipeBottom.width = data.width * Game.ratioWidth;
            pipeBottom.height = data.height * Game.ratioHeight;
            pipeBottom.v = data.velocity;
            pipeBottom.health = data.health;

            this.pipeTopObjects.push(pipeTop);
            this.pipeBottomObjects.push(pipeBottom);
        });

        this.createDragon();
        this.createBoss();
    }

    reset() {
        for (let i = this.pipeTopObjects.length - 1; i >= 0; i--) {
            let pipeTop = this.pipeTopObjects[i];
            let pipeBottom = this.pipeBottomObjects[i];
            pipeTop.emit(SpawningEvent.Despawn);
            pipeBottom.emit(SpawningEvent.Despawn);
        }

        this.dragon.emit(SpawningEvent.Despawn);
        this.boss.emit(SpawningEvent.Despawn);
    }

    _initSpawner() {
        this.pipeTopSpawner = new ContainerSpawner();
        this.pipeTopSpawner.init(this.createPipeTop, 9);
        this.pipeTopObjects = [];

        this.pipeBottomSpawner = new ContainerSpawner();
        this.pipeBottomSpawner.init(this.createPipeBottom, 9);
        this.pipeBottomObjects = [];
    }

    createPipeTop() {
        return new PipeTop();
    }

    createPipeBottom() {
        return new PipeBottom();
    }

    createDragon() {
        this.dragon = new Dragon(this.dataDragonFire);
        this.addChild(this.dragon);
        this.dragon.on(DragonEvent.Colliding, this._onLossLevel, this);
    }

    createBoss() {
        this.boss = new Boss(this.dataBossFire);
        this.boss.x = this.dataBoss.x * Game.ratioWidth;
        this.boss.y = this.dataBoss.y * Game.ratioHeight;
        this.boss.health = this.dataBoss.health;
        this.addChild(this.boss);
        this.boss.on(GameState.WinLevel, this._onWinLevel, this);
        this.boss.visible = false;
    }

    update(delta) {
        for (let i = 0; i < this.pipeTopObjects.length; i++) {
            this.pipeTopObjects[i].update(delta);
            this.pipeBottomObjects[i].update(delta);
        }
        this.dragon.update(delta);
        if (this.isDonePipe) {
            this.boss.update(delta);
        }

        this._checkEndPipe();
    }

    _checkEndPipe() {
        if (this.pipeTopObjects[this.pipeTopObjects.length - 1].x <
            -this.pipeTopObjects[this.pipeTopObjects.length - 1].width ||
            this.pipeBottomObjects[this.pipeBottomObjects.length - 1].x <
            -this.pipeBottomObjects[this.pipeBottomObjects.length - 1].width) {
            this._enableBoss();
        }
    }

    _enableBoss() {
        this.boss.visible = true;
        this.boss.onEnable();
        this.isDonePipe = true;
    }

    _onLossLevel() {
        this.reset();
        this.emit(GameState.LossLevel, this);
    }

    _onWinLevel() {
        this.reset();
        this.emit(GameState.WinLevel, this);
    }
}