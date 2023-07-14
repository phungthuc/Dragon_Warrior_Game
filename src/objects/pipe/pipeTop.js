import { Sprite, Texture } from "pixi.js";
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
        this._initCollider();
    }

    _initCollider() {
        this.pipeTopCollider = new Collider(ColliderTag.PipeTop, 0, -GameConstant.DISTANCE_PIPE * 2, GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT);
        this.addChild(this.pipeTopCollider);
        CollisionDetector.instance.addCollider(ColliderTag.PipeTop, this.pipeTopCollider)
        this.pipeTopCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    update(delta) {
        this.x -= this.v;
        this._checkOutOfScreen();
    }

    _onCollide(collider) {

    }

    _checkOutOfScreen() {

    }

}