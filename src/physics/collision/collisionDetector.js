import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";
import { GameState } from "../../scenes/gameState";
import { ColliderTag } from "./colliderTag";

export const CollisionDetectorEvent = Object.freeze({
    Colliding: "collisiondetector:colliding"
});

export default class CollisionDetector {

    static get instance() {
        if (this._instance) {
            return this._instance;
        } else {
            this._instance = new CollisionDetector();
        }
        return this._instance;
    }

    constructor() {
        this.dragonCollider = null;
        this.dragonFireCollider = [];
        this.pipeTopCollider = [];
        this.pipeBottomCollider = [];
        this.bossCollider = null;
        this.bossFireCollider = [];
    }

    addCollider(tag, col) {
        switch (tag) {
            case ColliderTag.Dragon:
                this.dragonCollider = col;
                break;
            case ColliderTag.DragonFire:
                this.dragonFireCollider.push(col);
                break;
            case ColliderTag.PipeTop:
                this.pipeTopCollider.push(col);
                break
            case ColliderTag.PipeBottom:
                this.pipeBottomCollider.push(col);
                break;
            case ColliderTag.Boss:
                this.bossCollider = col;
                break;
            case ColliderTag.BossFire:
                this.bossFireCollider.push(col);
                break;
            default:
                break;
        }
    }

    remove(collider) {
        const index = this.coliders.indexOf(collider);
        if (index !== -1) {
            this.coliders.splice(index, 1);
        }
    }

    update(delta) {
        this._checkDragonOutOfScreen();
        this._checkCollideDragonFireWithPipeTop();
        this._checkCollideDragonFireWithPipeBottom();
        this._checkCollideDragonWidthPipeTop();
        this._checkCollideDragonWidthPipeBottom();
        this._checkCollideDragonFireWithBoss();
        this._checkCollideDragonWithBossFire();
    }

    _checkDragonOutOfScreen() {
        if (this.dragonCollider.getBounding().y < 0 || this.dragonCollider.getBounding().y + this.dragonCollider.height / 2 > Game.height) {
            if (this.dragonCollider.enable === true) {
                this.dragonCollider.emit(CollisionDetectorEvent.Colliding);
            }
        }
    }

    _checkCollideDragonFireWithPipeTop() {
        for (let i = 0; i < this.dragonFireCollider.length; i++) {
            let col1 = this.dragonFireCollider[i];
            for (let j = 0; j < this.pipeTopCollider.length; j++) {
                if (col1.enable === true && this.pipeTopCollider[j].enable === true) {
                    if (this._isCollide(col1.getBounding(), this.pipeTopCollider[j].getBounding()) !== null) {
                        col1.emit(CollisionDetectorEvent.Colliding, this);
                        this.pipeTopCollider[j].emit(CollisionDetectorEvent.Colliding, this);
                    }
                }
            }
        }
    }

    _checkCollideDragonFireWithPipeBottom() {
        for (let i = 0; i < this.dragonFireCollider.length; i++) {
            let col1 = this.dragonFireCollider[i];
            for (let j = 0; j < this.pipeBottomCollider.length; j++) {
                if (col1.enable === true && this.pipeBottomCollider[j].enable === true) {
                    if (this._isCollide(col1.getBounding(), this.pipeBottomCollider[j].getBounding()) !== null) {
                        col1.emit(CollisionDetectorEvent.Colliding, this);
                        this.pipeBottomCollider[j].emit(CollisionDetectorEvent.Colliding, this);
                    }
                }
            }
        }
    }

    _checkCollideDragonWidthPipeTop() {
        for (let i = 0; i < this.pipeTopCollider.length; i++) {
            let col = this.pipeTopCollider[i];
            if (col.enable === true && this.dragonCollider.enable === true) {
                if (this._isCollide(col.getBounding(), this.dragonCollider.getBounding()) !== null) {
                    this.dragonCollider.emit(CollisionDetectorEvent.Colliding);
                }
            }
        }
    }

    _checkCollideDragonWidthPipeBottom() {
        for (let i = 0; i < this.pipeBottomCollider.length; i++) {
            let col = this.pipeBottomCollider[i];
            if (col.enable === true && this.dragonCollider.enable === true) {
                if (this._isCollide(col.getBounding(), this.dragonCollider.getBounding()) !== null) {
                    this.dragonCollider.emit(CollisionDetectorEvent.Colliding);
                }
            }
        }
    }

    _checkCollideDragonFireWithBoss() {
        for (let i = 0; i < this.dragonFireCollider.length; i++) {
            let col = this.dragonFireCollider[i];
            if (col.enable === true && this.bossCollider.enable === true) {
                if (this._isCollide(col.getBounding(), this.bossCollider.getBounding()) !== null) {
                    this.bossCollider.emit(CollisionDetectorEvent.Colliding);
                    col.emit(CollisionDetectorEvent.Colliding);
                }
            }
        }
    }

    _checkCollideDragonWithBossFire() {
        for (let i = 0; i < this.bossFireCollider.length; i++) {
            let col = this.bossFireCollider[i];
            if (col.enable === true && this.dragonCollider.enable === true) {
                if (this._isCollide(col.getBounding(), this.dragonCollider.getBounding()) !== null) {
                    this.dragonCollider.emit(CollisionDetectorEvent.Colliding);
                }
            }
        }
    }

    _isCollide(col1, col2) {
        const deltaWidth = (col1.width + col2.width) / 2;
        const deltaHeight = (col1.height + col2.height) / 2;
        const center1X = col1.x + col1.width / 2;
        const center1Y = col1.y + col1.height / 2;
        const center2X = col2.x + col2.width / 2;
        const center2Y = col2.y + col2.height / 2;

        const deltaX = Math.abs(center1X - center2X);
        const deltaY = Math.abs(center1Y - center2Y);

        if (deltaX <= deltaWidth && deltaY <= deltaHeight) {
            const overlapX = deltaWidth - deltaX;
            const overlapY = deltaHeight - deltaY;

            if (overlapX >= overlapY) {
                if (center1Y > center2Y) {
                    return "top";
                }
                return "bottom";
            }
            if (center1X > center2X) {
                return "left";
            }
            return "right";
        }
        return null;
    }
}