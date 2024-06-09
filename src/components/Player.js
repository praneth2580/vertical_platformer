class Player {
  constructor(
    pos = { x: 0, y: 0 },
    size = { width: 10, height: 10 },
    velocity = { x: 0, y: 0 }
  ) {
    this.size = size;
    this.pos = pos;
    this.velocity = velocity;
  }

  draw(ctx, frameCount) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
  }

  update(ctx, frameCount) {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.draw(ctx, frameCount);
  }
}

export default Player;
