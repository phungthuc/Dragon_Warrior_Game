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
        this._initSprite();
        this._initCollider();
    }

    _initSprite() {
        this.width = GameConstant.PIPE_WIDTH;
        this.height = GameConstant.PIPE_HEIGHT;
    }

    _initCollider() {
        this.pipeTopCollider = new Collider(ColliderTag.PipeTop, 0, 0, GameConstant.PIPE_WIDTH, GameConstant.PIPE_HEIGHT);
        this.addChild(this.pipeTopCollider);
        CollisionDetector.instance.addCollider(ColliderTag.PipeTop, this.pipeTopCollider)
        this.pipeTopCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    // setPosition(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    // setScale(width, height) {
    //     this.width = width;
    //     this.height = height;
    // }

    // setVelocity(velocity) {
    //     this.v = velocity;
    // }

    update(delta) {
        this.x -= 5;
        this._checkOutOfScreen();
    }

    _onCollide(collider) {

    }

    _checkOutOfScreen() {
        if (this.x < 720) {
            this.emit(PipeTopEvent.AddNewPipe)
        }
        if (this.x < - GameConstant.PIPE_WIDTH) {
            this.emit(PipeTopEvent.WallCollision, this);
        }
    }

}