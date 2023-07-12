import { ResolverManifest } from "pixi.js";

export const manifest = {
    bundles: [
        {
            name: "background",
            assets:
            {
                "bg_01": "assets/images/background/Layer_0011_0.png",
                "bg_02": "assets/images/background/Layer_0010_1.png",
                "bg_03": "assets/images/background/Layer_0009_2.png",
                "bg_04": "assets/images/background/Layer_0008_3.png",
                "bg_05": "assets/images/background/Layer_0007_Lights.png",
                "bg_06": "assets/images/background/Layer_0006_4.png",
                "bg_07": "assets/images/background/Layer_0005_5.png",
                "bg_08": "assets/images/background/Layer_0004_Lights.png",
                "bg_09": "assets/images/background/Layer_0003_6.png",
                "bg_10": "assets/images/background/Layer_0002_7.png",
                "bg_11": "assets/images/background/Layer_0001_8.png",
                "bg_12": "assets/images/background/Layer_0000_9.png"
            }
        },
        {
            name: "dragon",
            assets:
            {
                "dragon_01": "assets/images/dragon/strike_01.png",
                "dragon_02": "assets/images/dragon/strike_02.png",
                "dragon_03": "assets/images/dragon/strike_03.png",
                "dragon_04": "assets/images/dragon/strike_04.png",
                "dragon_05": "assets/images/dragon/strike_05.png",
                "dragonFire": "assets/images/dragon/explosion_06.png"
            }
        },
        {
            name: "pipe",
            assets:
            {
                "pipeTop": "assets/images/pipe/pipe_top.png",
                "pipeBottom": "assets/images/pipe/pipe_bottom.png"
            }
        },
        {
            name: "boss",
            assets:
            {
                "boss": "assets/images/boss/cc2d_body_0070.png",
                "bossFire": "assets/images/boss/fireball_03.png"
            }
        },
        {
            name: "particles",
            assets:
            {
                "particles_json": "assets/images/dragon/emitter.json",
                "particle": "assets/images/dragon/particle.png"
            }
        }
    ]
}