import { Sprite, Text, TextStyle, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { SpawningEvent } from "../../spawners/spawner";

export const PipeTopEvent = Object.freeze({
    Colliding: "pipetopevent:Colliding",
    WallColliding: "pipetopevent:wallcollision",
    AddNewPipe: "pipetopevent:addnewpipe"
});

export class PipeTop extends Sprite {
    constructor() {
        super(Texture.from("pipeTop"));

        this.v = null;
        this.health = null;
        this._initCollider();
        this._initHealth();

        this.on(SpawningEvent.Despawn, () => {
            this.pipeTopCollider.enable = false;
        });
        this.on(SpawningEvent.Spawn, () => {
            this.pipeTopCollider.enable = true;
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
        this.messHealth.y = this.y + (GameConstant.PIPE_HEIGHT / 2 - GameConstant.PIPE_HEALTH_SCALE_Y);

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
        this._checkOutOfScreen();
    }

    _onCollide(collider) {
        this._updateHealth();
    }

    _checkOutOfScreen() {
        if (this.x < -GameConstant.PIPE_WIDTH) {
            this.pipeTopCollider.enable = true;
        }
    }

    _updateHealth() {
        this.health -= 10;
        if (this.health == 0) {
            this.visible = false;
            this.pipeTopCollider.enable = false;
        }
    }

}