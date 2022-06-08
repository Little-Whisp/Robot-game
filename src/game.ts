//import the engine things
import * as PIXI from 'pixi.js'
import Matter from 'matter-js'

//import classes
import { Fish } from './fish'
import { Bubble } from './bubble'
import { Player } from './player'
import { Foreground } from "./foreground"

//import images
import fishImage from "./images/lostseed.png"
import bubbleImage from "./images/sakura.png"
import waterImage from "./images/bgspring.png"
import playerImage from "./images/didi_sprite.png"
import foregroundImage from "./images/foreground.png"

//import music
import bgMusic from "url:./images/Ballad.mp3" 
import jumpSoundFile from "url:./images/vine-boom.mp3"

export class Game {
    public pixi: PIXI.Application // canvas element in de html file
    private loader: PIXI.Loader
    private fishes: Fish[] = []
    private bubbles: Bubble[] = []
    private player: Player
    private foreground: Foreground;
    private score = 0

    public engine: Matter.Engine;
    

    constructor() {
        this.pixi = new PIXI.Application({ width: 1800, height: 450 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('playerTexture', playerImage)
            .add('foreground', foregroundImage)
            .add("music", bgMusic)
            .add("jumpsound", jumpSoundFile)
        this.loader.load(() => this.loadCompleted())

        this.engine = Matter.Engine.create()
    }

    private loadCompleted() {
        this.engine = Matter.Engine.create()

        let theme = this.loader.resources["music"].data!
        theme.play()

        const tilingSprite = new PIXI.TilingSprite(this.loader.resources["waterTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height,
        );
        this.pixi.stage.addChild(tilingSprite);

        this.player = new Player(this.loader.resources["playerTexture"].texture!, this)
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
            this.bubbles.push(bubble)
        }

        this.foreground = new Foreground(this.loader.resources["foreground"].texture!, this)
        this.pixi.stage.addChild(this.foreground)

        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    public update(delta: number) {
        Matter.Engine.update(this.engine, 1000 / 60)

        for (let fish of this.fishes) {
            fish.swim()
            if(this.collision(this.player, fish)){
                fish.hitCapy()
                this.score++
                console.log(this.score)
            }
        }
        for (let bubble of this.bubbles) {
            bubble.swim()
        }
        this.player.update()
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()