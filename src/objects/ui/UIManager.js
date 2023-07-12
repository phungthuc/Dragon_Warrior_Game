import { Container } from "pixi.js";
import { StartUI, StartUIEvent } from "./startUI";
import { GameConstant } from "../../gameConstant";
import { GameState } from "../../scenes/gameState";
import { PlayUI } from "./playUI";

export const UIManagerKey = Object.freeze({
    Start: GameConstant.StartUI,
    Playing: GameConstant.PlayingUI,
    WinLevel: GameConstant.WinLevelUI,
    LossLevel: GameConstant.LossLevelUI,
    Win: GameConstant.WinUI,
    Loss: GameConstant.LossUI
});

export class UIManager extends Container {
    constructor() {
        super();

        this._initGameUI();
    }

    _initGameUI() {
        this.startUI = new StartUI();
        this.addChild(this.startUI);
        this.startUI.on(StartUIEvent.ButtonClicked, () => {
            this.emit(UIManagerKey.Playing);
        });

        this.playUI = new PlayUI();
        this.addChild(this.playUI);

    }

    show(key) {
        switch (key) {
            case GameState.Start:
                this.startUI.show();
                this.playUI.hide();
                break;
            case GameState.Playing:
                this.playUI.show();
                this.startUI.hide();
                break;
            default:
                break;
        }
    }

    hide(key) {
        switch (key) {
            case value:

                break;

            default:
                break;
        }
    }

    resize() {

    }
}