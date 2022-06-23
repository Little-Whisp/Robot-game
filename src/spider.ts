import * as PIXI from "pixi.js"
import { Game } from "./Game"
import Matter from 'matter-js'

// Spider Class: Luke
export class Spider extends PIXI.Sprite {
    private rigidBody: Matter.Body;
    
// Spider movement: Kevin
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 900
    this.y = 20
    this.anchor.set(0.5);
    this.scale.set(0.2)

    this.rigidBody = Matter.Bodies.circle(100, 100, 30 , { friction: 0.00001, restitution: 0.5, density: 0.001});
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.reset()
  }
        
    //Shooting seed (Jany Code)
    public hit() {
        this.x = window.innerWidth + 100;
      }

      public hitSpider() {
        console.log("hit spider");
      }
    
    update() {
        this.x = this.rigidBody.position.x;
        this.y = this.rigidBody.position.y;
        Matter.Body.setVelocity(this.rigidBody, { x: -2, y: 5});
    
        if (this.rigidBody.position.x < -50) {
          this.reset()
        }
    }

    reset(){
        Matter.Body.setPosition(this.rigidBody, { x: 600, y: 50 });
      }
    }