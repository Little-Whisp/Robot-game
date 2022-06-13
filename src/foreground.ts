import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

export class Foreground extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 100;
    this.y = 100;
    this.anchor.set(0.5);
    this.width = 18000
    this.height = 200
<<<<<<< HEAD

    this.rigidBody = Matter.Bodies.rectangle(-500, 500, 18000, 200, {
=======
    this.rigidBody = Matter.Bodies.rectangle(-500, 500, 9000, 200, {
>>>>>>> a4144158d3e549c9b335a2eab832d08e7f6ad27a
      isStatic: true
    });
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
  }
}
