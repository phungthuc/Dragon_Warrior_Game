import { Container, Sprite, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { InputEvent, InputManager } from "../../input/inputManager";
import { GameConstant } from "../../gameConstant";
import { SpawningEvent } from "../../spawners/spawner";
import { DragonFire, DragonFireEvent } from "./dragonfire";
import { ContainerSpawner } from "../../spawners/containerSpawner";
import { Game } from "../../game";
import { ParticleController } from "../particle/particleController";

export const DragonEvent = Object.freeze({
    Colliding: "dragonevent:colliding"
});

export class Dragon extends Container {
    constructor(dataDragonFire) {
        super();

        this.dataDragonFire = dataDragonFire;
        this.acceleration = 0;
        this.vy = GameConstant.DRAGON_VY;
        this.interval = 20;
        this.spawnTime = 0;

        this.dragonPosition = {
            x: null,
            y: null
        };

        this._initSprite();
        this._initCollider();
        this._initDragonFireSpawner();
        this._initParticleSpawner();

        this.on(SpawningEvent.Despawn, () => {
            this.dragonCollider.enable = false;
        });

        InputManager.emitter.on(InputEvent.SpaceUp, this._onKeyUp, this);
        InputManager.emitter.on(InputEvent.TouchEnd, this._onKeyUp, this);

    }

    _initSprite() {
        this.dragon = new Sprite(Texture.from("dragon_05"));
        this.dragon.anchor.set(0.5);
        this.dragon.width = GameConstant.DRAGON_WIDTH * Game.ratioWidth;
        this.dragon.height = GameConstant.DRAGON_HEIGHT * Game.ratioHeight;
        this.position.set(GameConstant.DRAGON_X * Game.ratioWidth, GameConstant.DRAGON_Y * Game.ratioHeight);
        this.addChild(this.dragon);
    }

    _initCollider() {
        this.dragonCollider = new Collider(ColliderTag.Dragon, this.dragon.x - this.dragon.width / 2,
            this.dragon.y - this.dragon.height / 2, this.dragon.width, this.dragon.height);
        this.dragon.addChild(this.dragonCollider);
        CollisionDetector.instance.addCollider(ColliderTag.Dragon, this.dragonCollider);
        this.dragonCollider.on(CollisionDetectorEvent.Colliding, this._oncollide, this);
    }

    _initDragonFireSpawner() {
        this.dragonFireSpawner = new ContainerSpawner();
        this.dragonFireSpawner.init(this.createDragonFire, 30);
        this.dragonFireObjects = [];
    }

    _initParticleSpawner() {
        this.particleSpawner = new ContainerSpawner();
        this.particleSpawner.init(this.createParticle, 5);
    }

    createDragonFire() {
        return new DragonFire();
    }

    createParticle() {
        return new ParticleController();
    }

    spawnDragonFire() {
        let dragonFire = this.dragonFireSpawner.spawn(this.parent);
        dragonFire.x = this.x + GameConstant.DRAGON_FIRE_WIDTH;
        dragonFire.y = this.y;
        dragonFire.v = this.dataDragonFire.velocity * Game.ratioWidth;
        dragonFire.once(DragonFireEvent.Colliding, this.despawnDragonFire, this);
        dragonFire.once(DragonFireEvent.WallColliding, this.despawnDragonFireOutScreen, this);
        dragonFire.isCollide = true;
        this.dragonFireObjects.push(dragonFire);
    }

    despawnDragonFire(bullet) {
        if (this.dragonFireObjects.length > 0) {
            let index = this.dragonFireObjects.indexOf(bullet);
            if (index >= 0) {
                this.dragonFireObjects.splice(index, 1);
                let fx = this.particleSpawner.spawn(bullet.parent);
                fx.x = bullet.x;
                fx.y = bullet.y;
                bullet.emit(SpawningEvent.Despawn);
            }
        }
    }

    despawnDragonFireOutScreen(bullet) {
        if (this.dragonFireObjects.length > 0) {
            let index = this.dragonFireObjects.indexOf(bullet);
            if (index >= 0) {
                this.dragonFireObjects.splice(index, 1);
                bullet.emit(SpawningEvent.Despawn);
            }
        }
    }

    spawnParticle(parent) {
        console.log(parent.x)
        let particle = this.particleSpawner.spawn(parent);
        particle.x = parent.x + GameConstant.DRAGON_FIRE_WIDTH;
        particle.y = parent.y;
    }


    update(delta) {
        this.acceleration += delta * GameConstant.GRAVITY * GameConstant.ACCELERATION_SCALE * Game.ratioHeight;
        if (this.acceleration > GameConstant.MAX_ACCELERATION) {
            this.acceleration = GameConstant.MAX_ACCELERATION
        }
        this.y += this.acceleration;

        this.dragonPosition.x = this.x;
        this.dragonPosition.y = this.y;

        this.spawnTime += delta;
        if (this.spawnTime >= this.interval) {
            this.spawnDragonFire();
            this.spawnTime = 0;
        }
        for (let i = 0; i < this.dragonFireObjects.length; i++) {
            this.dragonFireObjects[i].update(delta);
        }
    }


    _onKeyUp() {
        this.acceleration = GameConstant.FORCE * Game.ratioHeight;
    }

    getPosition() {
        return this.dragonPosition;
    }

    _oncollide() {
        this.emit(DragonEvent.Colliding, this);
    }
}