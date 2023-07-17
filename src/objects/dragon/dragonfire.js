import { Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { GameConstant } from "../../gameConstant";
import { ParticleController } from "../particle/particleController";
import { SpawningEvent } from "../../spawners/spawner";

export const DragonFireEvent = Object.freeze({
    Colliding: "dragonfireevent:colliding"
});

export class DragonFire extends Container {
    constructor() {
        super();

        this.v = 0;

        this._initSprite();
        this._initCollider();
        this._initParticle();

        this.isCollide = true;

        this.on(SpawningEvent.Despawn, () => {
            this.dragonFireCollider.enable = false;
        });
    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("dragonFire"));

        this.sprite.width = GameConstant.DRAGON_FIRE_WIDTH;
        this.sprite.height = GameConstant.DRAGON_FIRE_HEIGHT;

        this.addChild(this.sprite);
    }

    _initCollider() {
        this.dragonFireCollider = new Collider(ColliderTag.DragonFire, 0, 0, GameConstant.DRAGON_FIRE_WIDTH, GameConstant.DRAGON_FIRE_HEIGHT);
        this.dragonFireCollider.enable = false;
        this.sprite.addChild(this.dragonFireCollider);
        CollisionDetector._instance.addCollider(ColliderTag.DragonFire, this.dragonFireCollider);
        this.dragonFireCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    _initParticle() {
        this.particleContainer = new ParticleController();
        this.addChild(this.particleContainer);
    }

    update(delta) {
        this.x += delta * this.v;
        this._checkOutOfScreen();
        this.checkIsCollide();
    }

    _checkOutOfScreen() {
        if (this.x > GameConstant.GAME_WIDTH) {
            this.emit(DragonFireEvent.Colliding, this);
        }
    }

    _onCollide() {
        this.isCollide = false;
        this.particleContainer.enableParticle();
        this.sprite.visible = false;
        setTimeout(() => {
            this._reset();
        }, 310);
    }

    _reset() {
        this.particleContainer.disEnableParticle();
        this.sprite.visible = true;
        this.emit(DragonFireEvent.Colliding, this);
    }

    checkIsCollide() {
        if (this.isCollide) {
            this.dragonFireCollider.enable = true;
        } else if (!this.isCollide) {
            this.dragonFireCollider.enable = false;
        }
    }

}