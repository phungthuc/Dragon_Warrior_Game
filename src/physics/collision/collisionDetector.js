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
            case ColliderTag.bossFireCollider:
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

    update() {

    }

    isCollide(col1, col2) {
        return col1.x < col2.x + col2.width &&
            col1.x + col1.width > col2.x &&
            col1.y < col2.y + col2.height &&
            col1.y + col1.height > col2.y
    }

}