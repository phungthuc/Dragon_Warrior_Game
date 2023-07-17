import { Container } from "pixi.js";
import { StartUI, StartUIEvent } from "./startUI";
import { GameConstant } from "../../gameConstant";
import { GameState } from "../../scenes/gameState";
import { PlayUI } from "./playUI";
import { LossLevelUI, LossLevelUIEvent } from "./lossLevelUI";
import { WinLevelUI, WinLevelUIEvent } from "./winLevelUI";

export const UIManagerKey = Object.freeze({
    Start: GameConstant.StartUI,
    Playing: GameConstant.PlayingUI,
    Replaying: GameConstant.ReplayingUI,
    NextPlaying: GameConstant.NextPlaying,
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

        this.lossLevelUI = new LossLevelUI();
        this.addChild(this.lossLevelUI);
        this.lossLevelUI.on(LossLevelUIEvent.ButtonClicked, () => {
            this.emit(UIManagerKey.Replaying);
        });

        this.winLevelUI = new WinLevelUI();
        this.addChild(this.winLevelUI);
        this.winLevelUI.on(WinLevelUIEvent.ButtonRestartClicked, () => {
            this.emit(UIManagerKey.Replaying);
        });
        this.winLevelUI.on(WinLevelUIEvent.ButtonNextClicked, () => {
            this.emit(UIManagerKey.NextPlaying);
        });
    }

    show(key) {
        switch (key) {
            case GameState.Start:
                this.startUI.show();
                this.playUI.hide();
                this.lossLevelUI.hide();
                this.winLevelUI.hide();
                break;
            case GameState.Playing:
                this.playUI.show();
                this.startUI.hide();
                this.lossLevelUI.hide();
                this.winLevelUI.hide();
                break;
            case GameState.LossLevel:
                this.lossLevelUI.show();
                this.playUI.hide();
                this.startUI.hide();
                this.winLevelUI.hide();
                break;
            case GameState.WinLevel:
                this.winLevelUI.show();
                this.playUI.hide();
                this.startUI.hide();
                this.lossLevelUI.hide();
                break;
            default:
                break;
        }
    }
}