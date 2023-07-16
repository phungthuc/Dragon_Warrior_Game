import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import { GameConstant } from "../../gameConstant";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";

export class Boss extends Container {
    constructor() {
        super();

        this.health = 100;
        this._initSprite();
        this._initHealth();
        this._initCollider();
    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("boss"));
        this.sprite.width = GameConstant.BOSS_WIDTH;
        this.sprite.height = GameConstant.BOSS_HEIGHT;
        this.addChild(this.sprite);
    }

    _initHealth() {
        this.style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 30,
            fill: "white"
        });

        this.messHealth = new Text(this.health, this.style);
        this.messHealth.x = this.x + GameConstant.BOSS_HEALTH_SCALE_X;
        this.messHealth.y = this.y - GameConstant.BOSS_HEALTH_SCALE_Y;

        this.addChild(this.messHealth);

    }

    _initCollider() {
        this.bossCollider = new Collider(ColliderTag.Boss, 0, 0, GameConstant.BOSS_WIDTH, GameConstant.BOSS_HEIGHT);
        this.sprite.addChild(this.bossCollider);
        CollisionDetector.instance.addCollider(ColliderTag.Boss, this.bossCollider);
        this.bossCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    update() {

    }

    _updateHealth() {

    }

    _onCollide() {

    }
}