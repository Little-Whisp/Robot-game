import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

export class Platform extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 0;
    this.y = 100;
    this.width = 800
    this.height = 100
      this.rigidBody = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height) ;{
      isStatic: true
    };
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
  }
}
