import { Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class PipeBottom extends Sprite {
    constructor() {
        super(Texture.from("pipeBottom"));

        this._initSprite();
        this._initCollider();
    }

    _initSprite() {
        this.width = GameConstant.PIPE_WIDTH;
        this.height = GameConstant.PIPE_HEIGHT;
        this.position.set(500, 100);
    }

    _initCollider() {

    }

    onStart() {

    }

    _onCollide(collider) {

    }

    update(delta) {

    }

}