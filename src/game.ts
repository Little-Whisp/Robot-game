import * as PIXI from 'pixi.js'
import { Fish } from './fish'
import { Bubble } from './bubble'
import { Player } from './player'
import fishImage from "./images/leaff.png"
import bubbleImage from "./images/sakura.png"
import waterImage from "./images/bgspring.png"
import playerImage from "./images/capey.png"

class Game {

    private pixi: PIXI.Application // canvas element in de html file
    private loader: PIXI.Loader
    private fishes: Fish[] = []
    private bubbles: Bubble[] = []
    private player: Player

    constructor() {

        console.log("yjujikuyu")
        this.pixi = new PIXI.Application({ width: 1800, height: 450 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('playerTexture', playerImage)
        this.loader.load(() => this.loadCompleted())
    }

    private loadCompleted() {

        const tilingSprite = new PIXI.TilingSprite(this.loader.resources["waterTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height,
        );
        this.pixi.stage.addChild(tilingSprite);

        this.player = new Player(this.loader.resources["playerTexture"].texture!)
        this.pixi.stage.addChild(this.player)

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

    public update(delta: number) {
        for (let fish of this.fishes) {
            fish.swim()
        }
        for (let bubble of this.bubbles) {
            bubble.swim()
        }
        this.player.update()
    }
}

let g = new Game()