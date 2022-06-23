import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

//floor (Kevin)
export class Nightsceneground extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 100;
    this.y = 100;
    this.anchor.set(0.5);
    this.width = 18000
    this.height = 200

    this.rigidBody = Matter.Bodies.rectangle(6000, 350, 18000, -10, {

      isStatic: true
    });
    
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
  }
}
