import { Container, ParticleContainer, Texture } from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import * as  particleSettings from "../../../assets/images/dragon/emitter.json";

export class ParticleController extends ParticleContainer {
    constructor() {
        super();

        this._initParticle();
    }

    _initParticle() {
        this.texture = Texture.from("particle");
        this.emitter = new particles.Emitter(this, particles.upgradeConfig(particleSettings, [this.texture]));
    }

    enableParticle() {
        this.emitter.autoUpdate = true;
        this.emitter.emit = true;
        this.emitter.playOnce();
    }

    disEnableParticle() {
        this.emitter.autoUpdate = false;
        this.emitter.emit = false;
        this.emitter.cleanup();
    }

    update(dt) {
        // this.emitter.update(dt);
    }
}