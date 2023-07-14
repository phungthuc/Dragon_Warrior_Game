import { Container } from "pixi.js";
import { ContainerSpawner } from "../spawners/containerSpawner";
import { PipeTop } from "../objects/pipe/pipeTop";
import { SpawningEvent } from "../spawners/spawner";
import { PipeBottom } from "../objects/pipe/pipeBottom";
import { Dragon } from "../objects/dragon/dragon";
import { DragonFire, DragonFireEvent } from "../objects/dragon/dragonfire";
import { InputEvent, InputManager } from "../input/inputManager";
import { GameConstant } from "../gameConstant";

export class Level extends Container {
    constructor() {
        super("level");

        this.dataDragonFire = {};
        this.positionDragon = {};

        InputManager.emitter.on(InputEvent.MouseUp, this.spawnDragonFire, this);
        this._initSpawner();
    }

    loadLevel(jsonData) {
        let pipeData = jsonData.pipes;

        this.dataDragonFire = jsonData.dragonFire;

        pipeData.forEach(data => {
            let pipeTop = this.pipeTopSpawner.spawn(this);
            let pipeBottom = this.pipeBottomSpawner.spawn(this);

            pipeTop.x = data.x;
            pipeTop.y = data.yTop;
            pipeTop.width = data.width;
            pipeTop.height = data.height;
            pipeTop.v = data.velocity;

            pipeBottom.x = data.x;
            pipeBottom.y = data.yBottom;
            pipeBottom.width = data.width;
            pipeBottom.height = data.height;
            pipeBottom.v = data.velocity;

            this.pipeTopObjects.push(pipeTop);
            this.pipeBottomObjects.push(pipeBottom);
        });

        this.createDragon();
    }

    reset() {
        for (let i = this.pipeTopObjects.length - 1; i >= 0; i--) {
            let pipeTop = this.pipeTopObjects[i];
            let pipeBottom = this.pipeBottomObjects[i];

            pipeTop.emit(SpawningEvent.Despawn);
            pipeBottom.emit(SpawningEvent.Despawn);
        }
    }

    _initSpawner() {
        this.pipeTopSpawner = new ContainerSpawner();
        this.pipeTopSpawner.init(this.createPipeTop, 5);
        this.pipeTopObjects = [];

        this.pipeBottomSpawner = new ContainerSpawner();
        this.pipeBottomSpawner.init(this.createPipeBottom, 5);
        this.pipeBottomObjects = [];

        this.dragonFireSpawner = new ContainerSpawner();
        this.dragonFireSpawner.init(this.createDragonFire, 20);
        this.dragonFireObjects = [];
    }

    createPipeTop() {
        return new PipeTop();
    }

    createPipeBottom() {
        return new PipeBottom();
    }

    createDragonFire() {
        return new DragonFire();
    }

    createDragon() {
        this.dragon = new Dragon();
        this.addChild(this.dragon);
        this.positionDragon = this.dragon.getPosition();
    }

    spawnDragonFire() {
        let dragonFire = this.dragonFireSpawner.spawn(this);
        dragonFire.x = this.positionDragon.x + GameConstant.DRAGON_FIRE_WIDTH;
        dragonFire.y = this.positionDragon.y;
        dragonFire.v = this.dataDragonFire.velocity;
        dragonFire.once(DragonFireEvent.Colliding, this.despawnDragonFire, this);
        this.dragonFireObjects.push(dragonFire);
    }

    despawnDragonFire(bullet) {
        if (this.dragonFireObjects.length > 0) {
            let index = this.dragonFireObjects.indexOf(bullet);
            if (index >= 0) {
                this.dragonFireObjects.splice(index, 1);
                bullet.emit(SpawningEvent.Despawn);
            }
        }
    }

    update(delta) {
        for (let i = 0; i < this.pipeTopObjects.length; i++) {
            this.pipeTopObjects[i].update(delta);
            this.pipeBottomObjects[i].update(delta);
        }
        for (let i = 0; i < this.dragonFireObjects.length; i++) {
            this.dragonFireObjects[i].update(delta);
        }
        this.dragon.update(delta);
        this._checkEndPipe();

    }

    _checkEndPipe() {
        if (this.pipeTopObjects[this.pipeTopObjects.length - 1].x <
            -this.pipeTopObjects[this.pipeTopObjects.length - 1].width ||
            this.pipeBottomObjects[this.pipeBottomObjects.length - 1].x <
            -this.pipeBottomObjects[this.pipeBottomObjects.length - 1].width) {
            this.reset();
        }
    }
}