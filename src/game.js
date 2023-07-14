import { Application, Assets } from "pixi.js";
import { GameConstant } from "./gameConstant";
import { manifest } from "./manifest/assets";
import { PlayScene } from "./scenes/playScene";
import { InputManager } from "./input/inputManager";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
            resolution: 1,
        });

        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.top = "50%";
        this.app.renderer.view.style.left = "50%";
        this.app.renderer.view.style.transform = "translate(-50%,-50%)";
        this.app.renderer.view.style.border = "1px solid #d8d8d8";

        document.body.appendChild(this.app.view);
        // const viewStyle = this.app.view.style;
        // viewStyle.position = "absolute";
        // viewStyle.display = "block";
        // viewStyle.padding = "0px 0px 0px 0px";
        this.resize(GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);

        this._loadGameAssets().then(() => {
            this._initInputHandle();
            this._initScene();
            this.app.ticker.add(this.update, this);
        }).catch((err) => {
            console.log(err);
        });
    }

    static resize(width, height) {
        let style = this.app.view.style;
        this.windowWidth = width;
        this.windowHeight = height;
        this.app.view.width = this.windowWidth;
        this.app.view.height = this.windowHeight;
        this.app.resizeTo = this.app.view;
        this.app.resize();
    }

    static async _loadGameAssets() {
        await Assets.init({
            manifest: manifest
        });

        const bundleIds = manifest.bundles.map(
            bundles => bundles.name
        );

        await Assets.loadBundle(bundleIds, this._downloadProgess.bind(this));
    }

    static _downloadProgess(progessRatio) {
        if (progessRatio === 1) {
            console.log("Download Successfully!");
        }
    }

    static _initScene() {
        this.playScene = new PlayScene();
        this.app.stage.addChild(this.playScene);
    }

    static _initInputHandle() {
        InputManager.init();
    }

    static update(delta) {
        this.playScene.update(delta)
    }
}

window.onload = function () {
    Game.init();
}
