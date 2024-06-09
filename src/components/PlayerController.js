import { arrowFrameCount, SIZE_DIVIDER } from "./Constants";

class PlayerController {
  constructor() {
    this.hasBinded = false;
    this.dragPoint1 = {
      x: 0,
      y: 0,
    };
    this.dragPoint2 = {
      x: -1,
      y: -1,
    };
    this.angle = 0;
    this.player = null;
    this.drawnFrameCount = 0;
  }

  bindToCanvas(canvas) {
    this.canvas = canvas;
    this.hasBinded = true;
    this.bindDragListener();
  }

  bindDragListener() {
    if (this.hasBinded) {
      this.canvas.addEventListener("mousedown", (e) => {
        // console.log("Mouse Down", e.offsetX, e.offsetY);
        this.dragPoint1.x = e.offsetX / SIZE_DIVIDER;
        this.dragPoint1.y = e.offsetY / SIZE_DIVIDER;
        this.dragPoint2.x = -1;
        this.dragPoint2.y = -1;
      });
      this.canvas.addEventListener("mouseup", (e) => {
        // console.log("Mouse Up", e.offsetX, e.offsetY);
        this.dragPoint2.x = e.offsetX / SIZE_DIVIDER;
        this.dragPoint2.y = e.offsetY / SIZE_DIVIDER;
        this.calculateAngle();
      });
    } else {
      console.error({
        err: "undefined error",
        message: "binding drag listener to canvas that is not binded yet",
        location: "PlayerController.js",
      });
    }
  }

  bindPlayer(player) {
    this.player = player;
  }

  calculateAngle() {
    this.angle =
      (Math.atan2(
        this.dragPoint2.y - this.dragPoint1.y,
        this.dragPoint2.x - this.dragPoint1.x
      ) *
        180) /
      Math.PI;
    // console.log(this.angle);
  }

  resetDrag() {
    this.dragPoint1.x = 0;
    this.dragPoint1.y = 0;
    this.dragPoint2.x = -1;
    this.dragPoint2.y = -1;
    this.angle = 0;
  }

  draw(ctx, frameCount) {
    ctx.beginPath();
    ctx.moveTo(
      this.player.pos.x + this.player.size.width / 2,
      this.player.pos.y + this.player.size.height / 2
    );
    ctx.lineTo(this.dragPoint2.x, this.dragPoint2.y);
    ctx.stroke();
    ctx.fillRect(this.dragPoint2.x, this.dragPoint2.y, 1, 1);
    this.drawnFrameCount = frameCount;
  }

  update(ctx, frameCount) {
    if (this.player) {
      if (
        this.dragPoint2.x > -1 &&
        (this.drawnFrameCount == 0 ||
          this.drawnFrameCount + arrowFrameCount > frameCount)
      ) {
        console.log("called");
        this.draw(ctx, frameCount);
      } else {
        console.log("reset");
        this.resetDrag();
      }
    }
  }
}

export default PlayerController;
