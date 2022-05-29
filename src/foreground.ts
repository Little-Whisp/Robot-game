
import * as PIXI from "pixi.js"

export class Foreground extends PIXI.Sprite {


    constructor(texture: PIXI.Texture) {
        super(texture)

        this.width = 2400;
        this.height = 450;

        this.x = 0;
        this.y = 400;

        // let area = this.getBounds()
        // let greenbox = new PIXI.Graphics()
        // greenbox.lineStyle(2, 0x33FF33, 1)
        // greenbox.drawRect(0, 0, area.width, area.height)
        // this.addChild(greenbox)
    }

    update(delta: number) {

    }
}