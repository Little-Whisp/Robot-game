//import the engine things
import * as PIXI from 'pixi.js'
import Matter from 'matter-js'

//import classes
import { Seed } from './seed'
import { Particale } from './particale'
import { Player } from './player'
import { Spider } from './spider'
import { Nightsceneground } from "./nightsceneground"
import { Seedcollect } from "./seedcollect"
import { Platform } from "./platform"
import { Platform2 } from "./platform2"

//import images
import deathScreen from "./images/gameover.png"
import spiderImage from "./images/spider.png"
import particleImage from "./images/sakura.png"
import sunnightsceneImage from "./images/sunnightscene.png"
import seedImage from "./images/seed.png"
import backgroundnightsceneImage from "./images/bgspring.png"
import playerImage from "./images/didi_sprite.png"
import platformImage from "./images/platform.png"
import nightscenegroundImage from "./images/forground.png"

//import music
import bgMusic from "url:./images/Ballad.mp3"
import jumpSoundFile from "url:./images/vine-boom.mp3"

export class Game {


    public pixi: PIXI.Application // canvas element in de html file
    private loader: PIXI.Loader
    private seeds: Seed[] = []
    private particales: Particale[] = []
    private spiders: Spider[] = []
    private seedscollect: Seedcollect[] = []

    private player: Player
    private gameOverButton: PIXI.Sprite
    private nightsceneground: Nightsceneground;
    private platform: Platform;
    private platform2: Platform2;
    private score = 0

    public engine: Matter.Engine;


    constructor() {
        this.pixi = new PIXI.Application({ width: 18000, height: 450 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
            .add('particleTexture', particleImage)
            .add('spiderTexture', spiderImage)
            .add('platformTexture', platformImage)
            .add('seedTexture', seedImage)
            .add('backgroundnightsceneTexture', backgroundnightsceneImage)
            .add('playerTexture', playerImage)
            .add('nightscenegroundTexture', nightscenegroundImage)
            .add('death', deathScreen)
            .add('sunnightsceneTexture', sunnightsceneImage)
            .add("music", bgMusic)
            .add("jumpsound", jumpSoundFile)
        this.loader.load(() => this.loadCompleted())

        this.engine = Matter.Engine.create()
    }

    private loadCompleted() {
        this.engine = Matter.Engine.create()

        let theme = this.loader.resources["music"].data!
        theme.play()

        const tilingSprite = new PIXI.TilingSprite(this.loader.resources["backgroundnightsceneTexture"].texture!,
            this.pixi.screen.width,
            this.pixi.screen.height,
        );
        this.pixi.stage.addChild(tilingSprite);


        let sunnightscene = new PIXI.Sprite(this.loader.resources["sunnightsceneTexture"].texture!);
        this.pixi.stage.addChild(sunnightscene);

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
            let particale = new Particale(this.loader.resources["particleTexture"].texture!)
            this.pixi.stage.addChild(particale)
            this.particales.push(particale)
        }

        let seed = new Seed(this.loader.resources["seedTexture"].texture!)
        this.pixi.stage.addChild(seed)
        this.seeds.push(seed)

        this.nightsceneground = new Nightsceneground(this.loader.resources["nightscenegroundTexture"].texture!, this)
        this.pixi.stage.addChild(this.nightsceneground)

        this.platform = new Platform(this.loader.resources["platformTexture"].texture!, this)
        this.pixi.stage.addChild(this.platform)

        this.platform2 = new Platform2(this.loader.resources["foreground"].texture!, this)
        this.pixi.stage.addChild(this.platform2)

        

        let spider = new Spider(this.loader.resources["spiderTexture"].texture!, this)
        this.pixi.stage.addChild(spider)
        this.spiders.push(spider)

        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    //Shooting seed (Jany code)
    public shootSeedcollect(bx: number, by: number) {
        let seedcollect = new Seedcollect(
            bx,
            by,
            this,
            this.loader.resources["seedTexture"].texture!
        );
        this.pixi.stage.addChild(seedcollect);
        this.seedscollect.push(seedcollect);
    }
    //Delete seed when hit (Jany code)
    public removeSeedcollect(seedcollect: Seedcollect) {
        this.seedscollect = this.seedscollect.filter((s) => s !== seedcollect);
    }

    private gameOver() {
        console.log("game over")
        this.pixi.stop()
        this.gameOverButton = new PIXI.Sprite(this.loader.resources["death"].texture!)
        this.gameOverButton.width = 100
        this.gameOverButton.height = 100
        this.gameOverButton.x = 400
        this.gameOverButton.y = 200
        this.gameOverButton.interactive = true
        this.gameOverButton.buttonMode = true
        this.gameOverButton.on('pointerdown', () => this.resetGame())


        this.pixi.stage.addChild(this.gameOverButton)
    }

    private resetGame() {
        // delete the game over button
        this.gameOverButton.destroy()
        // restart pixi
        this.player.resetPosition()
        this.pixi.start()
    }

    

    public update(delta: number) {
        Matter.Engine.update(this.engine, 1000 / 60)

        for (let seed of this.seeds) {
            if (this.collision(this.player, seed)) {
                seed.hitDidi()
                this.player.hitseed()
                this.score++
                console.log(this.score)
            }
        }

        for (let spider of this.spiders) {
            spider.swim();
            for (let s of this.seedscollect) {
                if (this.collision(s, spider)) {
                    s.hit();
                    spider.hit();
                }
            }
        }

        for (let spider of this.spiders) {
            if (this.collision(this.player, spider)) {
                this.gameOver()
            }
        }
        for (let seedcollect of this.seedscollect) {
            seedcollect.update()
        }

        for (let particale of this.particales) {
            particale.move()
        }

        this.player.update()
        console.log(this.player.gotSeed)
    }

    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()