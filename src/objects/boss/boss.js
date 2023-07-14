import { Sprite, Texture } from "pixi.js";

export class Boss extends Sprite {
    constructor() {
        super(Texture.from("boss"));


    }

    _initCollider() {

    }
}