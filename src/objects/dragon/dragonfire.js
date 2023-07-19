import { Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { GameConstant } from "../../gameConstant";
import { SpawningEvent } from "../../spawners/spawner";
import { Game } from "../../game";

export const DragonFireEvent = Object.freeze({
    Colliding: "dragonfireevent:colliding",
    WallColliding: "dragonfireevent:wallcolliding"
});

export class DragonFire extends Container {
    constructor() {
        super();

        this.v = 0;

        this._initSprite();
        this._initCollider();

        this.on(SpawningEvent.Spawn, () => {
            this.dragonFireCollider.enable = true;
            this.sprite.visible = true;
        });

        this.on(SpawningEvent.Despawn, () => {
            this.dragonFireCollider.enable = false;
            this.sprite.visible = false;
        });
    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("dragonFire"));

        this.sprite.width = GameConstant.DRAGON_FIRE_WIDTH * Game.ratioWidth;
        this.sprite.height = GameConstant.DRAGON_FIRE_HEIGHT * Game.ratioHeight;

        this.addChild(this.sprite);
    }

    _initCollider() {
        this.dragonFireCollider = new Collider(ColliderTag.DragonFire, 0, 0, this.sprite.width, this.sprite.height);
        this.dragonFireCollider.enable = false;
        this.sprite.addChild(this.dragonFireCollider);
        CollisionDetector._instance.addCollider(ColliderTag.DragonFire, this.dragonFireCollider);
        this.dragonFireCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    update(delta) {
        this.x += delta * this.v;
        this._checkOutOfScreen();
    }

    _checkOutOfScreen() {
        if (this.x > Game.width - 50 * Game.ratioWidth) {
            this.emit(DragonFireEvent.WallColliding, this);
        }
    }

    _onCollide() {
        this.emit(DragonFireEvent.Colliding, this);
        this.sprite.visible = false;
    }
}