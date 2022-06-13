import * as PIXI from "pixi.js"
import { Game } from "./Game"
import Matter from 'matter-js'

export class Spider extends PIXI.Sprite {
    rigidBody: Matter.Body
    // jumpSound:HTMLAudioElement
    speed: number = 0
    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.anchor.set(0.5)

        this.x =  2900;
        this.y =  368;

        this.scale.set(0.2)

        const playerOptions: Matter.IBodyDefinition = {
            density: 0.001,
            friction: 0.7,
            frictionStatic: 0,
            frictionAir: 0.01,
            restitution: 0.5,
            inertia: Infinity,
            inverseInertia: Infinity,
            label: "Enemy"
        }
        this.rigidBody = Matter.Bodies.rectangle(600, 230, 75, 100, playerOptions)
        Matter.Composite.add(game.engine.world, this.rigidBody)
    }


    update() {
    
        if (this.x > 1500) {
            this.x = 0;
            // this.jumpSound.play()
        } else if (this.x < -100) {
            this.x = 1500
        } else if (this.y < -20) {
            this.x = -100;
            this.y =  250;
        }
        this.x = this.rigidBody.position.x
        this.y = this.rigidBody.position.y
        this.rotation = this.rigidBody.angle

        // if (this.rigidBody.position.y > 1500) this.resetPosition()
        // } else if (this.speed == 0) {
        //     Matter.Body.setVelocity(this.rigidBody, { x: 0, y: 4 })
        // }
        
    }


    beforeUnload() {

    }
}