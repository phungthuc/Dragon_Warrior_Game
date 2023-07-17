import { Container, Sprite, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { InputEvent, InputManager } from "../../input/inputManager";
import { GameConstant } from "../../gameConstant";
import { SpawningEvent } from "../../spawners/spawner";

export const DragonEvent = Object.freeze({
    Colliding: "dragonevent:colliding"
});

export class Dragon extends Container {
    constructor() {
        super();

        this.acceleration = 0;
        this.vy = GameConstant.DRAGON_VY;

        this.dragonPosition = {
            x: null,
            y: null
        };

        this._initSprite();
        this._initCollider();

        this.on(SpawningEvent.Despawn, () => {
            this.dragonCollider.enable = false;
        });

        InputManager.emitter.on(InputEvent.SpaceUp, this._onKeyUp, this);

    }

    _initSprite() {
        this.dragon = new Sprite(Texture.from("dragon_05"));
        this.dragon.width = GameConstant.DRAGON_WIDTH;
        this.dragon.height = GameConstant.DRAGON_HEIGHT;
        this.dragon.position.set(GameConstant.DRAGON_X, GameConstant.DRAGON_Y);
        this.addChild(this.dragon);
    }

    _initCollider() {
        this.dragonCollider = new Collider(ColliderTag.Dragon, 0, 0, GameConstant.DRAGON_WIDTH * 1.25, GameConstant.DRAGON_HEIGHT * 2);
        this.dragon.addChild(this.dragonCollider);
        CollisionDetector.instance.addCollider(ColliderTag.Dragon, this.dragonCollider);
        this.dragonCollider.on(CollisionDetectorEvent.Colliding, this._oncollide, this);
    }

    update(delta) {
        this.acceleration += delta * GameConstant.GRAVITY * GameConstant.ACCELERATION_SCALE;
        if (this.acceleration > GameConstant.MAX_ACCELERATION) {
            this.acceleration = GameConstant.MAX_ACCELERATION
        }
        this.dragon.y += this.acceleration;

        this.dragonPosition.x = this.dragon.x;
        this.dragonPosition.y = this.dragon.y;
    }


    _onKeyUp() {
        this.acceleration = GameConstant.FORCE;
    }

    getPosition() {
        return this.dragonPosition;
    }

    _oncollide() {
        this.emit(DragonEvent.Colliding, this);
    }
}