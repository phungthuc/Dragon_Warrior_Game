export const GameConstant = Object.freeze({
  GAME_WIDTH: 720,
  GAME_HEIGHT: 1280,

  //Key UI Manager
  StartUI: "uimanagerkey:start",
  PlayingUI: "uimanagerkey:playing",
  ReplayingUI: "uimanagerkey:replaying",
  NextPlaying: "uimanagerkey:nextplaying",
  WinLevelUI: "uimanagerkey:losslevel",
  LossLevelUI: "uimanagerkey:losslevel",
  WinUI: "uimanagerkey:win",
  LossUI: "uimanagerkey:loss",

  //Boss
  BOSS_WIDTH: 160,
  BOSS_HEIGHT: 480,
  BOSS_X: 760,
  BOSS_Y: 340,
  EXPLOSION_X: 760,
  EXPLOSION_Y: 400,

  //Dragon
  DRAGON_X: 64,
  DRAGON_Y: 306,
  DRAGON_WIDTH: 52,
  DRAGON_HEIGHT: 112,
  DRAGON_VY: 0,
  GRAVITY: 9.81,
  MAX_ACCELERATION: 16,
  FORCE: -8,
  ACCELERATION_SCALE: 0.05,

  //Dragon Fire
  DRAGON_FIRE_WIDTH: 36,
  DRAGON_FIRE_HEIGHT: 69,
  DRAGON_FIRE_SPEED: 5,

  //Boss Fire
  BOSS_FIRE_WIDTH: 52,
  BOSS_FIRE_HEIGHT: 42,
  BOSS_FIRE_X: 780,
  BOSS_FIRE_Y: 420,
  BOSS_FIRE_SPEED: 5,
  BOSS_FIRE_ANGLE: Math.PI / 18,
  BOSS_FIRE_VY: Math.PI / 4,
  BOSS_FIRE_QUANTITY: 7,
  BOSS_HEALTH_SCALE_X: 50,
  BOSS_HEALTH_SCALE_Y: 50,


  //Pipe
  PIPE_WIDTH: 32,
  PIPE_HEIGHT: 640,
  DISTANCE_PIPE: 160,
  PIPE_X: 1080,
  PIPE_VX: 3,
  PIPE_QUANTITY: 2,
  PIPE_HEALTH_WIDTH: 16,
  PIPE_HEALTH_HEIGHT: 24,
  PIPE_HEALTH_SCALE_X: 8,
  PIPE_HEALTH_SCALE_Y: 24,

  //UI
  SCALE_DISTANCE_MESS: 300,

  //Collider
  DEBUG_COLLIDER: false
});