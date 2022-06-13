import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

export class Platform extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 0;
    this.y = 100;
    this.width = 2000
    this.height = 100
    this.rigidBody = Matter.Bodies.rectangle(-500, 500, 9000, 200, {
      isStatic: true
    });
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
  }
}
