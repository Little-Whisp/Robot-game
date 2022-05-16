import * as PIXI from 'pixi.js'

import didiImage from "./images/Didi.png"
import bubbleImage from "./images/bubble.png"
import backgroundImage from "./images/Background.png"
import { LoaderResource } from 'pixi.js'



class FishGame {
    pixi: PIXI.Application
    loader: PIXI.Loader
    // fishes: PIXI.Sprite[] = []
    didi: PIXI.Sprite
    bubbleImage: PIXI.Sprite
    background: PIXI.Sprite

    //
    // STAP 1 - maak een pixi canvas
    //
    constructor() {
        console.log('I am Pixi')
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        //
        // STAP 2 - preload alle afbeeldingen
        //
        this.loader = new PIXI.Loader()
        this.loader.add('didiTexture', didiImage)
            .add('bubbleTexture', bubbleImage)
            .add('backgroundTexture', backgroundImage)
        this.loader.load(() => this.loadCompleted())
    }

    //
    // STAP 3 - maak een sprite als de afbeeldingen zijn geladen
    //

    loadCompleted() {

        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background)

        this.didi = new PIXI.Sprite(this.loader.resources["didiTexture"].texture!)
        this.didi.x = 20 * this.pixi.screen.width
        this.didi.y = 30 * this.pixi.screen.height
        this.didi.anchor.set(0.3)
        this.didi.tint = Math.random() * 0xD12229;
        this.didi.scale.set(0.6)

        this.pixi.stage.addChild(this.didi)
        // this.fishes.push(this.fish)

        this.pixi.ticker.add(() => this.update())
        console.log('Youre images are loaded!')

        this.bubbleImage = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
        this.bubbleImage.x = Math.random() * this.pixi.screen.width
        this.bubbleImage.y = Math.random() * this.pixi.screen.height
        this.pixi.stage.addChild(bubbleImage)


        

    }

    update() {
        this.didi.x += 1
        if (this.didi.x > 900) {
            this.didi.x = 0
        }
    }

}

let MyGame = new FishGame()

// let fishes: PIXI.Sprite[] = []
// let bubbleImage: PIXI.Sprite

// //
// // STAP 1 - maak een pixi canvas
// //
// const pixi = new PIXI.Application({ width: 800, height: 450 })
// document.body.appendChild(pixi.view)

// //
// // STAP 2 - preload alle afbeeldingen
// //
// const loader = new PIXI.Loader()
// loader.add('fishTexture', fishImage)
//     .add('bubbleTexture', bubbleImage)
//     .add('waterTexture', waterImage)
// loader.load(() => loadCompleted())

// //
// // STAP 3 - maak een sprite als de afbeeldingen zijn geladen
// //
// function loadCompleted() {

//     pixi.ticker.add((delta) => update(delta))
//     console.log('Youre images are loaded!')

//     let water = new PIXI.Sprite(loader.resources["waterTexture"].texture!)
//     pixi.stage.addChild(water)

//     for (let i = 0; i < 100; i++) {
//         let fish = new PIXI.Sprite(loader.resources["fishTexture"].texture!)
//         fish.x = Math.random() * pixi.screen.width
//         fish.y = Math.random() * pixi.screen.height
//         // fish.rotation = 0.3
//         fish.anchor.set(0.5)
//         fish.tint = Math.random() * 0xD12229;
//         fish.scale.set(0.6)

//         pixi.stage.addChild(fish)
//         fishes.push(fish)


//         let bubbleImage = new PIXI.Sprite(loader.resources["bubbleTexture"].texture!)
//         bubbleImage.x = 400
//         bubbleImage.y = 100
//         pixi.stage.addChild(bubbleImage)
//     }

// }


// function update(delta: number) {
//     for (let fish of fishes) {
//         fish.x += 1
//         // fish.rotation += 0.1
//         if (fish.x > 900) {
//             fish.x = 0
//         }
//     }

// }