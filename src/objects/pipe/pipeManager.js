import { Container } from "pixi.js";
import { PipeTop, PipeTopEvent, PipeTopd } from "./pipeTop";
import { ContainerSpawner } from "../../spawners/containerSpawner";
import { SpawningEvent } from "../../spawners/spawner";
import { Game } from "../../game";
import { PipeBottom } from "./pipeBottom";

export class PipeManager extends Container {
    constructor(dataPipes, num_of_pipe) {
        super();

        this.dataPipes = dataPipes;
        this.num_of_pipe = num_of_pipe;
        this.pipeTops = [];

        this._initPipeTopSpawner();
        this._initPipeTop();

    }

    update(delta) {
        if (this.pipeTops) {
            this.pipeTops[0].update(delta);
        }
    }

    _initPipeTop() {
        for (let i = 0; i < 3; i++) {
            let pipeTop = this.pipeTopSpawner.spawn(this);
            pipeTop.setPosition(this.dataPipes[i].x, this.dataPipes[i].y_top);
            pipeTop.setScale(this.dataPipes[i].w, this.dataPipes[i].h);
            pipeTop.setVelocity(this.dataPipes[i].velocity);
            pipeTop.on(PipeTopEvent.WallCollision, this.onDespawner, this);
            pipeTop.on(PipeTopEvent.AddNewPipe, this.onSpawner, this);
            this.pipeTops.push(pipeTop);
        }
    }

    _initPipeBottom() {

    }

    _initPipeTopSpawner() {
        this.pipeTopSpawner = new ContainerSpawner();
        this.pipeTopSpawner.init(this.createPipeTop, 3);
    }

    _initPipeBottomSpawner() {
        this.pipeBottomSpawner = new ContainerSpawner();
        this.pipeBottomSpawner.init(this.createPipeTop, 3);
    }

    createPipeTop() {
        return new PipeTop();
    }

    createPipeBottom() {
        return new PipeBottom();
    }

    onSpawner() {
        this.pipeTops.shift();
    }

    onDespawner(obj) {
        this.pipeTopSpawner.despawn(obj);
    }

}