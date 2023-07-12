import { Application, Assets } from "pixi.js";
import { GameConstant } from "./gameConstant";
import { manifest } from "./manifest/assets";
import { PlayScene } from "./scenes/playScene";

export class Game {
    static init() {
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";
        this.resize(window.innerWidth, window.innerHeight);

        this._loadGameAssets().then(() => {
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

        this.playScene && this.playScene.resize();
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

    static update(delta) {
        this.playScene.update(delta)
    }
}

window.onload = function () {
    Game.init();
}
