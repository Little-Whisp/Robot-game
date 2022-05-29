import * as PIXI from 'pixi.js'

export class Fish extends PIXI.Sprite {
public speed : number

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.speed = Math.random() * 5
        this.x = Math.random() * 800
        this.y = Math.random() * 600
        this.anchor.set(0.5)
        this.scale.set(Math.random() * 1)

    }
   public swim(){
         this.x *= 1
            this.tint = 0xFFFFFF;
            this.rotation -= 0.009
            this.x += 2
            if (this.x > 1900) {
                this.x = -100
            }
        this.x -= this.speed
    }
    public hitCapy(){
        this.x = 10000000
   }
}