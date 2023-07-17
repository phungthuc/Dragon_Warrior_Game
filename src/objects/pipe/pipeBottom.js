import { Sprite, Text, TextStyle, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { SpawningEvent } from "../../spawners/spawner";

export class PipeBottom extends Sprite {
    constructor() {
        super(Texture.from("pipeBottom"));

        this.v = null;
        this.health = null;
        this._initCollider();
        this._initHealth();

        this.on(SpawningEvent.Despawn, () => {
            this.pipeBottomCollider.enable = false;
        });
        this.on(SpawningEvent.Spawn, () => {
            this.pipeBottomCollider.enable = true;
        });
    }

    _initHealth() {
        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 22,
            fill: "black"
        });

        this.messHealth = new Text(this.health, this.style);
        this.messHealth.x = this.x + GameConstant.PIPE_HEALTH_SCALE_X;
        this.messHealth.y = this.y;

        this.addChild(this.messHealth);
    }

    _initCollider() {
        this.pipeBottomCollider = new Collider(ColliderTag.PipeBottom, 0, 0, GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT);
        this.addChild(this.pipeBottomCollider);
        CollisionDetector.instance.addCollider(ColliderTag.PipeBottom, this.pipeBottomCollider);
        this.pipeBottomCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    update(delta) {
        if (!this.visible) {
            return;
        }
        this.messHealth.text = this.health;
        this.x -= this.v * delta;

    }

    _onCollide(collider) {
        this._updateHealth();
    }

    _checkOutOfScreen() {
        if (this.x < -GameConstant.PIPE_WIDTH) {
            this.pipeBottomCollider.enable = true;
        }
    }

    _updateHealth() {
        this.health -= 10;
        if (this.health == 0) {
            this.visible = false;
            this.pipeBottomCollider.enable = false;
        }
    }
}