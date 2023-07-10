import { Container } from "pixi.js";
import { Game } from "../game";
import { GameConstant } from "../gameConstant";
import { InputEvent, InputManager } from "../input/inputManager";
import { EnemyManager, EnemyManagerEvent } from "../objects/enemies/enemyManager";
import { Player } from "../objects/player/player";
import { PlayUI } from "../objects/ui/playUI";
import { TutorialUI } from "../objects/ui/tutorialUI";
import { WinUI } from "../objects/ui/winUI";

export const GameState = Object.freeze({
  Tutorial: "tutorial",
  Playing: "playing",
  Win: "win",
  Lose: "lose"
})

export class PlayScene extends Container{
  constructor() {
    super();
    this.state = GameState.Tutorial;
    this._initInputHandler();
    this._initGameplay();
    this._initUI();
  }

  _initInputHandler() {
    InputManager.emitter.on(InputEvent.MouseDown, this._onPointerDown, this);
    InputManager.emitter.on(InputEvent.MouseMove, this._onPointerMove, this);
    InputManager.emitter.on(InputEvent.MouseUp, this._onPointerUp, this);
  }

  _onPointerDown(pos) {
    if (this.state !== GameState.Playing) {
      return;
    }
    this.player.onPointerDown(pos);
  }

  _onPointerMove(pos) {
    if (this.state !== GameState.Playing) {
      return;
    }
    this.player.onPointerMove(pos);
  }

  _onPointerUp(pos) {
    if (this.state !== GameState.Playing) {
      return;
    }
    this.player.onPointerUp(pos);
  }

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);
    this._initPlayer();
    this._initEnemies();
  }

  _initUI() {
    this.playUI = new PlayUI();
    this.addChild(this.playUI);

    this.tutorialUI = new TutorialUI();
    this.addChild(this.tutorialUI);

    this.winUI = new WinUI();
    this.addChild(this.winUI);
    this.winUI.hide();

    this.tutorialUI.on("tapped", this._onStart, this);
  }

  _initPlayer() {
    this.player = new Player();
    this.player.x = Game.width / 2;
    this.player.y = Game.height * 0.7;
    this.gameplay.addChild(this.player);
  }

  _initEnemies() {
    this.enemyManager = new EnemyManager();
    this.gameplay.addChild(this.enemyManager);
    this.enemyManager.on(EnemyManagerEvent.Removed, this._onEnemyRemoved, this);
  }

  _onEnemyRemoved() {
    this.playUI.updateScore(10 - this.enemyManager.enemies.length);
    if (this.enemyManager.enemies.length <= 0) {
      this._onWin();
    }
  }

  update(dt) {
    if (this.state !== GameState.Win) {
      this.enemyManager.update(dt);
    }

    if (this.state === GameState.Playing) {
      this.playUI.updateTime(dt);
    }
  }

  resize() {
    this.tutorialUI.resize();
    this.winUI.resize();
    this.playUI.resize();
    if (this.state === GameState.Playing) {
      return;
    }
    this.player.x = Game.width / 2;
    this.player.y = Game.height * 0.7;
  }

  _onStart() {
    this.state = GameState.Playing;
    this.tutorialUI.hide();
    this.player.onStart();
  }

  _onWin() {
    this.winUI.show();
    this.state = GameState.Win;
  }
}