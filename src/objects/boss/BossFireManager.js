import { Container } from "pixi.js";
import { BossFire } from "./bossFire";
import { GameConstant } from "../../gameConstant";
import { SpawningEvent } from "../../spawners/spawner";
import { Game } from "../../game";

export const BossFireManagerEvent = Object.freeze({
    Colliding: "bossfiremanagerevent:colliding"
});

export class BossFireManager extends Container {
    constructor() {
        super();

        this.bossFires = [];
        this.v = 0;
        this.vX = 0;

        this.isCollide = true;

        this._init();
    }

    _init() {
        for (let i = 0; i < GameConstant.BOSS_FIRE_QUANTITY; i++) {
            i % 2 == 0 ? this.bossFire = new BossFire(GameConstant.BOSS_FIRE_ANGLE * i) :
                this.bossFire = new BossFire(- GameConstant.BOSS_FIRE_ANGLE * i)
            this.addChild(this.bossFire);
            this.bossFire.isCollide = true;
            this.bossFires.push(this.bossFire);
        }
    }

    update(delta) {
        for (let i = 0; i < GameConstant.BOSS_FIRE_QUANTITY; i++) {
            this.bossFires[i].update(delta);
            if (i % 2 == 0) {
                this.bossFires[i].x -= this.v * delta * Game.ratioWidth;
                this.bossFires[i].y -= GameConstant.BOSS_FIRE_VY * i * delta;
            } else {
                this.bossFires[i].x -= this.v * delta * Game.ratioWidth;
                this.bossFires[i].y -= -GameConstant.BOSS_FIRE_VY * i * delta;
            }
        }
    }

    _onCollide() {

    }

}