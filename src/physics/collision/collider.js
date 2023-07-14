import { Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Collider extends Sprite {
    constructor(tag, x, y, width, height) {
        super(Texture.WHITE);
        this.tag = tag;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.enable = true;

        this.visible = GameConstant.DEBUG_COLLIDER;
    }

    getBounding() {
        return this.getBounds();
    }
}