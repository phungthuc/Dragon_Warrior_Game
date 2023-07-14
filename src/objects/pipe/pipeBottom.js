import { Sprite, Text, TextStyle, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";

export class PipeBottom extends Sprite {
    constructor() {
        super(Texture.from("pipeBottom"));

        this.v = 0;
        this.health = 0;
        this._initCollider();
        this._initHealth();
    }

    _initHealth() {
        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 24,
            fill: "black"
        });

        this.messHealth = new Text(this.health, this.style);
        this.messHealth.width = GameConstant.MESS_HEALTH_WIDTH;
        this.messHealth.height = GameConstant.MESS_HEALTH_HEIGHT;
        this.messHealth.x = this.x + GameConstant.MESS_HEALTH_SCALE_X;
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
        this.messHealth.text = this.health;
        this.x -= this.v * delta;

    }

    _onCollide(collider) {

    }
}