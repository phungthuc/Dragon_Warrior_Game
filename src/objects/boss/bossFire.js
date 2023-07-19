import { Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { GameConstant } from "../../gameConstant";
import { SpawningEvent } from "../../spawners/spawner";
import { Game } from "../../game";

export class BossFire extends Sprite {
    constructor(angle) {
        super(Texture.from("bossFire"));

        this.angle = angle;
        this.isCollide = false;

        this.width = GameConstant.BOSS_FIRE_WIDTH * Game.ratioWidth;
        this.height = GameConstant.BOSS_FIRE_HEIGHT * Game.ratioHeight;
        this.rotation = this.angle;

        this._initCollider();

        this.on(SpawningEvent.Despawn, () => {
            this.bossFireCollider.enable = false;
        });
        this.on(SpawningEvent.Spawn, () => {
            this.bossFireCollider.enable = true;
        });
    }

    _initCollider() {
        this.bossFireCollider = new Collider(ColliderTag.BossFire, 0, 0, this.width, this.height * 2);
        this.bossFireCollider.enable = false;
        this.addChild(this.bossFireCollider);
        CollisionDetector._instance.addCollider(ColliderTag.BossFire, this.bossFireCollider);
        this.bossFireCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    update(delta) {
        this._checkIsCollide();
    }

    _checkIsCollide() {
        if (this.isCollide) {
            this.bossFireCollider.enable = true;
        } else {
            this.bossFireCollider.enable = false;
        }
    }

    _onCollide() {

    }
}