import * as PIXI from "pixi.js"
import { Game } from "./Game"

//StartButton class: Luke
export class StartButton extends PIXI.Sprite {
    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game

        //Start Button Position
        this.x = 500
        this.y = 300
        //Randomize tint on refresh
        this.tint = Math.random() * 0xFFFFFF

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.buttonClicked())
    }

    //When clicked, load the first stage
    buttonClicked() {
        console.log("clicked start button!")
        this.game.loadStage()
    }
}