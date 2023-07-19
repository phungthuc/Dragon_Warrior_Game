import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Collider } from "../../physics/collision/collider";
import { ColliderTag } from "../../physics/collision/colliderTag";
import { GameConstant } from "../../gameConstant";
import CollisionDetector, { CollisionDetectorEvent } from "../../physics/collision/collisionDetector";
import { SpawningEvent } from "../../spawners/spawner";
import { GameState } from "../../scenes/gameState";
import { ContainerSpawner } from "../../spawners/containerSpawner";
import { BossFireManager } from "./BossFireManager";
import { Game } from "../../game";

export class Boss extends Container {
    constructor(dataBossFire) {
        super();

        this.dataBossFire = dataBossFire;
        this.bossFireObjects = [];
        this.health = 100;
        this._initSprite();
        this._initHealth();
        this._initCollider();
        this._initBossFireSpawner();

        this.intervalSpawn = 100;
        this.intervalDespawn = 300;
        this.spawnTime = 0;
        this.despawnTime = 0;

        this.on(SpawningEvent.Despawn, () => {
            this.bossCollider.enable = false;
        });

    }

    _initSprite() {
        this.sprite = new Sprite(Texture.from("boss"));
        this.sprite.width = GameConstant.BOSS_WIDTH * Game.ratioWidth;
        this.sprite.height = GameConstant.BOSS_HEIGHT * Game.ratioHeight;
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
        this.bossCollider = new Collider(ColliderTag.Boss, 0, 0, GameConstant.BOSS_WIDTH * 2,
            GameConstant.BOSS_HEIGHT * 4);
        this.sprite.addChild(this.bossCollider);
        this.bossCollider.enable = false;
        CollisionDetector.instance.addCollider(ColliderTag.Boss, this.bossCollider);
        this.bossCollider.on(CollisionDetectorEvent.Colliding, this._onCollide, this);
    }

    _initBossFireSpawner() {
        this.bossFireSpawner = new ContainerSpawner();
        this.bossFireSpawner.init(this.createBossFires, 5);
    }

    createBossFires() {
        return new BossFireManager();
    }

    spawBossFire() {
        let bossFire = this.bossFireSpawner.spawn(this);
        bossFire.x = this.sprite.x;
        bossFire.y = this.sprite.y + 80;
        bossFire.v = this.dataBossFire.velocityX;
        bossFire.isCollide = true;
        this.bossFireObjects.push(bossFire);
    }

    despawnBossFire(bullet) {
        if (this.bossFireObjects.length > 0) {
            let index = this.bossFireObjects.indexOf(bullet);
            if (index >= 0) {
                this.bossFireObjects.splice(index, 1);
                bullet.emit(SpawningEvent.Despawn);
            }
        }
    }


    update(delta) {
        this.messHealth.text = this.health;
        for (let i = 0; i < this.bossFireObjects.length; i++) {
            this.bossFireObjects[i].update(delta);
        }
        this.spawnTime += delta;
        this.despawnTime += delta;
        if (this.spawnTime >= this.intervalSpawn) {
            this.spawBossFire();
            this.spawnTime = 0;
        }
        if (this.despawnTime >= this.intervalDespawn) {
            this.despawnBossFire(this.bossFireObjects[0]);
            this.despawnTime = 0;
        }
    }


    _onCollide() {
        this._updateHealth();
    }

    _updateHealth() {
        this.health -= 1;
        if (this.health == 0) {
            this.emit(GameState.WinLevel);
            this.bossCollider.emit(GameState.WinLevel);
        }
    }

    onEnable() {
        this.bossCollider.enable = true;
    }
}