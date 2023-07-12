import { Container } from "pixi.js";
import { ContainerSpawner } from "../spawners/containerSpawner";
import { PipeTop } from "../objects/pipe/pipeTop";
import { SpawningEvent } from "../spawners/spawner";

export class Level extends Container {
    constructor() {
        super("level");
        this._initSpawner();
    }

    loadLevel(jsonData) {
        let pipeData = jsonData.pipes;
        pipeData.forEach(data => {
            let pipe = this.pipeSpawner.spawn(this);
            this.pipeObjects.push(pipe);
            pipe.x = data.x;
            pipe.y = data.y_top;
            pipe.width = data.w;
            pipe.height = data.h;
        });
    }

    reset() {
        for (let i = this.pipeObjects.length - 1; i >= 0; i--) {
            let pipe = this.pipeObjects[i];
            pipe.emit(SpawningEvent.Despawn);
        }
    }

    _initSpawner() {
        this.pipeSpawner = new ContainerSpawner();
        this.pipeSpawner.init(this.createPipe, 3);
        this.pipeObjects = [];
    }

    createPipe() {
        return new PipeTop();
    }
}