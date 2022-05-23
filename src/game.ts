import * as PIXI from 'pixi.js'
import { Fish } from './fish'
import { Bubble } from './bubble'
import fishImage from "./images/leaff.png"
import bubbleImage from "./images/sakura.png"
import waterImage from "./images/bgspring.png"

class Game {

    pixi: PIXI.Application // canvas element in de html file
    loader: PIXI.Loader
    fishes: Fish[] = []
    bubbles: Bubble[] = []

    constructor() {
        console.log("yjujikuyu")
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        // let background = new PIXI.Sprite(this.loader.resources["waterTexture"].texture!)
        // background.scale.set(1)
        // this.pixi.stage.addChild(background)

        const tilingSprite = new PIXI.TilingSprite(this.loader.resources["waterTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height,
        );
        this.pixi.stage.addChild(tilingSprite);

        let count = 0;

        this.pixi.ticker.add(() => {
            count += 0.005;

            tilingSprite.tileScale.x = 1;
            // tilingSprite.tileScale.y = 1 + Math.cos(count);

            tilingSprite.tilePosition.x += -2;
            // tilingSprite.tilePosition.y += 0;
        })

        for (let i = 0; i < 40; i++) {
            let fish = new Fish(this.loader.resources["fishTexture"].texture!)

            this.pixi.stage.addChild(fish)
            this.fishes.push(fish)

            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)

            this.pixi.stage.addChild(bubble)
            this.fishes.push(bubble)
        }
        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    update(delta: number) {
        for (let fish of this.fishes) {
            fish.swim()
        }
        for (let bubble of this.bubbles) {
            bubble.swim()
        }
    }
}

let g = new Game()