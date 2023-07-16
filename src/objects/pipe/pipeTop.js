import { Sprite, Text, TextStyle, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";

export const PipeTopEvent = Object.freeze({
    WallCollision: "pipetopevent:wallcollision",
    AddNewPipe: "pipetopevent:addnewpipe"
});

export class PipeTop extends Sprite {
    constructor() {
        super(Texture.from("pipeTop"));

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
        this.messHealth.x = this.x + GameConstant.MESS_HEALTH_SCALE_X;
        this.messHealth.y = this.y + (GameConstant.PIPE_HEIGHT / 2 - GameConstant.MESS_HEALTH_SCALE_Y);

        this.addChild(this.messHealth);

    }

    _initCollider() {
        this.pipeTopCollider = new Collider(ColliderTag.PipeTop, 0, -GameConstant.DISTANCE_PIPE * 2, GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT);
        this.addChild(this.pipeTopCollider);
        CollisionDetector.instance.addCollider(ColliderTag.PipeTop, this.pipeTopCollider)
        this.pipeTopCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }


    update(delta) {
        this.messHealth.text = this.health;
        this.x -= this.v * delta;
    }

    _onCollide(collider) {

    }

    _checkOutOfScreen() {

    }

}