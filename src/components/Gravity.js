import { SIZE } from "./Constants";

class Gravity {
  constructor(gravity_value) {
    this.gravity_value = gravity_value;
    this.binded_entities = [];
  }

  calculateGravity(entity) {
    entity.pos.y += this.gravity_value;
  }

  bindEntity(entity) {
    this.binded_entities.push(entity);
  }

  calculate() {
    this.binded_entities.forEach((entity) => {
      //   if (entity.pos.y < SIZE.height) {
      if ((entity.pos.y + entity.velocity.y + entity.size.height) < SIZE.height) {
        entity.velocity.y = entity.velocity.y + this.gravity_value;
      } else {
        entity.velocity.y = 0;
      }
    });
  }
}

export default Gravity;
