import { Container, Sprite, Texture, TextureSystem } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Game } from "../../game";
import { PipeTop } from "../pipe/pipeTop";

export class PlayUI extends Container {
    constructor() {
        super();

        this._init();
        this.resize();
    }

    _init() {
        this.layer_01 = new Sprite(Texture.from("bg_01"));
        this.layer_02 = new Sprite(Texture.from("bg_02"));
        this.layer_03 = new Sprite(Texture.from("bg_03"));
        this.layer_04 = new Sprite(Texture.from("bg_04"));
        this.layer_05 = new Sprite(Texture.from("bg_05"));
        this.layer_06 = new Sprite(Texture.from("bg_06"));
        this.layer_07 = new Sprite(Texture.from("bg_07"));
        this.layer_08 = new Sprite(Texture.from("bg_08"));
        this.layer_09 = new Sprite(Texture.from("bg_09"));
        this.layer_10 = new Sprite(Texture.from("bg_10"));
        this.layer_11 = new Sprite(Texture.from("bg_11"));
        this.layer_12 = new Sprite(Texture.from("bg_12"));

        this.layer_01.position.set(0, 0);
        this.layer_02.position.set(0, 0);
        this.layer_03.position.set(0, 0);
        this.layer_04.position.set(0, 0);
        this.layer_05.position.set(0, 0);
        this.layer_06.position.set(0, 0);
        this.layer_07.position.set(0, 0);
        this.layer_08.position.set(0, 0);
        this.layer_09.position.set(0, 0);
        this.layer_10.position.set(0, 0);
        this.layer_11.position.set(0, 0);
        this.layer_12.position.set(0, 0);

        this.addChild(this.layer_01);
        this.addChild(this.layer_02);
        this.addChild(this.layer_03);
        this.addChild(this.layer_04);
        this.addChild(this.layer_05);
        this.addChild(this.layer_06);
        this.addChild(this.layer_07);
        this.addChild(this.layer_08);
        this.addChild(this.layer_09);
        this.addChild(this.layer_10);
        this.addChild(this.layer_11);
        this.addChild(this.layer_12);

        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    resize() {
        this.layer_01.width = Game.windowWidth;
        this.layer_01.height = Game.windowHeight;
        this.layer_02.width = Game.windowWidth;
        this.layer_02.height = Game.windowHeight;
        this.layer_03.width = Game.windowWidth;
        this.layer_03.height = Game.windowHeight;
        this.layer_04.width = Game.windowWidth;
        this.layer_04.height = Game.windowHeight;
        this.layer_05.width = Game.windowWidth;
        this.layer_05.height = Game.windowHeight;
        this.layer_06.width = Game.windowWidth;
        this.layer_06.height = Game.windowHeight;
        this.layer_07.width = Game.windowWidth;
        this.layer_07.height = Game.windowHeight;
        this.layer_08.width = Game.windowWidth;
        this.layer_08.height = Game.windowHeight;
        this.layer_09.width = Game.windowWidth;
        this.layer_09.height = Game.windowHeight;
        this.layer_10.width = Game.windowWidth;
        this.layer_10.height = Game.windowHeight;
        this.layer_11.width = Game.windowWidth;
        this.layer_11.height = Game.windowHeight;
        this.layer_12.width = Game.windowWidth;
        this.layer_12.height = Game.windowHeight;

    }
}