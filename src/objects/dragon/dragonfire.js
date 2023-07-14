import { Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import * as particles from "@pixi/particle-emitter";
import * as  particleSettings from "../../../assets/images/dragon/emitter.json";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { GameConstant } from "../../gameConstant";

export const DragonFireEvent = Object.freeze({
    Colliding: "dragonfireevent:colliding"
});

export class DragonFire extends Container {
    constructor() {
        super();

        this._initSprite();
        this._initCollider();

        this.v = 0;
    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("dragonFire"));

        this.sprite.width = GameConstant.DRAGON_FIRE_WIDTH;
        this.sprite.height = GameConstant.DRAGON_FIRE_HEIGHT;

        this.addChild(this.sprite);

        this.particleContainer = new ParticleContainer();
        this.addChild(this.particleContainer);

        this.emitter = new particles.Emitter(
            this.particleContainer, particleSettings
        );

    }

    _initCollider() {
        this.dragonFireCollider = new Collider(ColliderTag.DragonFire, 0, 0, GameConstant.DRAGON_FIRE_WIDTH, GameConstant.DRAGON_FIRE_HEIGHT);
        this.sprite.addChild(this.dragonFireCollider);
        CollisionDetector._instance.addCollider(ColliderTag.DragonFire, this.dragonFireCollider);
        this.dragonFireCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    update(delta) {
        this.x += delta * this.v;
        this._checkOutOfScreen();
    }

    enableParticle() {
        this.sprite.visible = true;
        this.emitter.autoUpdate = true;
        // this.emitter.updateSpawnPos(this.dragonFire.x, this.dragonFire.y);
        this.emitter.emit = true;
    }

    _checkOutOfScreen() {
        if (this.x > GameConstant.GAME_WIDTH) {
            this._onCollide();
        }
    }

    _onCollide() {
        this.emit(DragonFireEvent.Colliding, this);
    }
}