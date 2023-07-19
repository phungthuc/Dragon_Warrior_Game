import { Container, ParticleContainer, Texture } from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import * as  particleSettings from "../../../assets/images/dragon/emitter.json";
import { SpawningEvent } from "../../spawners/spawner";

export class ParticleController extends ParticleContainer {
    constructor() {
        super();

        this._initParticle();
        this.on(SpawningEvent.Spawn, () => {
            this.enableParticle();
        });
    }

    _initParticle() {
        this.texture = Texture.from("particle");
        this.emitter = new particles.Emitter(this, particles.upgradeConfig(particleSettings, [this.texture]));
        this.emitter.autoUpdate = true;
    }

    enableParticle() {
        this.emitter.emit = true;
        this.emitter.playOnce(() => {
            this.emit(SpawningEvent.Despawn, this);
        });
    }

    disEnableParticle() {
        this.emitter.emit = false;
        this.emitter.cleanup();
    }

    update(dt) {
    }
}