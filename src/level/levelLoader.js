export class LevelLoader {
    constructor(dataLevel) {
        this.dataLevel = dataLevel;

        this.data = {
            "numPipe": null,
            "distancePipes": null,
            "pipes": [],
            "boss": null,
            "dragonFire": null,
            "bossFire": null
        };

        this.loadData();
    }

    loadData() {
        this.data.numPipe = this.dataLevel.num_of_pipe;
        this.data.distancePipes = this.dataLevel.distance_pipes;
        for (let i = 0; i < this.dataLevel.items.length; i++) {
            switch (this.dataLevel.items[i].type) {
                case "pipe":
                    this.data.pipes.push(this.dataLevel.items[i].data);
                    break;
                case "boss":
                    this.data.boss = this.dataLevel.items[i].data;
                    break;
                case "dragon_fire":
                    this.data.dragonFire = this.dataLevel.items[i].data;
                    break;
                case "boss_fire":
                    this.data.bossFire = this.dataLevel.items[i].data;
                    break;
                default:
                    break;
            }
        }
    }

    getData() {
        return this.data;
    }
}