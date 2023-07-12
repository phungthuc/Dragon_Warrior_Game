export const SpawningEvent = Object.freeze({
  Spawn: "spawn",
  Despawn: "despawn",
  Despawned: "despawned",
});


export class Spawner {
  constructor() {
    this.pool = [];
  }

  init(createObjectCallback, size = 1) {
    this.createObject = createObjectCallback;
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createObject());
    }
  }

  despawn(obj) {
    this.pool.push(obj);
    obj.parent?.removeChild(obj);
    if (obj.emit) {
      obj.emit(SpawningEvent.Despawned, obj);
    }
  }

  spawn() {
    let obj = this.pool.pop();
    if (!obj) {
      obj = this.createObject();
    }
    if (obj.once) {
      obj.once(SpawningEvent.Despawn, () => this.despawn(obj));
    }

    if (obj.emit) {
      obj.emit(SpawningEvent.Spawn, this);
    }
    return obj;
  }
}
