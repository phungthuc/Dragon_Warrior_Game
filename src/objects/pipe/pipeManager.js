import { Container } from "pixi.js";
import { PipeTop } from "./pipeTop";
import { ContainerSpawner } from "../../spawners/containerSpawner";
import { SpawningEvent } from "../../spawners/spawner";
import { Game } from "../../game";

export class PipeManager extends Container {
    constructor() {
        super();
        this.pipes = [];

        this._initPipeTopSpawner();
        this._initPipe();

    }

    update(delta) {
        // for (let i = 0; i < this.pipes.length; i++) {
        //     this.pipes[i].x += i * delta;
        //     if (this.pipes[i].x > Game.windowWidth) {
        //         this.pipeTopSpawner.despawn(this.pipes[i]);
        //     }
        // }
    }

    _initPipe() {
        for (let i = 0; i < 10; i++) {
            let pipeTop = this.pipeTopSpawner.spawn(this);
            this.pipes.push(pipeTop);
            pipeTop.x = 100;
            pipeTop.y = 100;
        }
        // this.pipeTopSpawner.despawn(pipeTop);
        // pipeTop.emit(SpawningEvent.Despawn);
    }

    _initPipeTopSpawner() {
        this.pipeTopSpawner = new ContainerSpawner();
        this.pipeTopSpawner.init(this.createPipeTop, 10);
    }

    createPipeTop() {
        return new PipeTop();
    }
}