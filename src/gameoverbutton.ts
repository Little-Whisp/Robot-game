import * as PIXI from "pixi.js"
import { Game } from "./Game"

//GameOverButton ORIGINAL: SASHA, SEPERATE .TS: LUKE
export class GameOverButton extends PIXI.Sprite {
    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game

        this.width = 100
        this.height = 100
        this.x = 400
        this.y = 200

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.buttonClicked())
    }

    buttonClicked() {
        console.log("clicked start button!")
        this.game.resetGame()
    }
}