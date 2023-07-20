import { Application, Assets } from "pixi.js";
import { GameConstant } from "./gameConstant";
import { manifest } from "./manifest/assets";
import { PlayScene } from "./scenes/playScene";
import { InputManager } from "./input/inputManager";
// import VConsole from 'vconsole';

export class Game {
    static init() {
        // this.vConsole = new VConsole();
        this.app = new Application({
            width: GameConstant.GAME_WIDTH,
            height: GameConstant.GAME_HEIGHT,
            backgroundColor: 0x1099bb,
            resolution: 1,
        });
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px 0px 0px 0px";
        // this.ratioWidth = window.innerWidth / GameConstant.GAME_WIDTH;
        // this.ratioHeight = window.innerHeight / GameConstant.GAME_HEIGHT;
        this.resize(window.innerWidth, window.innerHeight);

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
        let ratio = 1;
        // let ratio = Math.max(GameConstant.GAME_WIDTH / this.windowWidth, GameConstant.GAME_HEIGHT / this.windowHeight);
        this.width = this.windowWidth * ratio;
        this.height = this.windowHeight * ratio;
        this.app.view.width = this.width;
        this.app.view.height = this.height;
        // let scale = this.windowWidth / this.width;
        // style.transformOrigin = "0px 0px";
        // style.transform = `scale(${scale})`;
        // let vMargin = Math.floor((this.windowWidth - this.width * scale) / 2);
        // let hMargin = Math.floor((this.windowHeight - this.height * scale) / 2);
        // style.margin = `${hMargin}px ${vMargin}px ${hMargin}px ${vMargin}px`;
        this.ratioWidth = window.innerWidth / GameConstant.GAME_WIDTH;
        this.ratioHeight = window.innerHeight / GameConstant.GAME_HEIGHT;
        this.app.resizeTo = this.app.view;
        this.app.resize();
        this.playScene && this.playScene.resize();
        // console.log(window.innerWidth / GameConstant.GAME_WIDTH);
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
    window.onresize = () => {
        Game.resize(window.innerWidth, window.innerHeight);
    }
}


