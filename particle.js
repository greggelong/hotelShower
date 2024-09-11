// partical system
// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1.5, 4));
    this.acc = createVector(0, 0);
    //this.r = 8;
    this.lifetime = 60;
    //this.a = random(180);
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 1;
    //this.a--;
  }

  show() {
    noStroke();
    if (state === 1) {
      push();
      translate(this.pos.x, this.pos.y);
      //let clr =myvideo.get(floor(this.pos.x/5.5),floor(this.pos.y/8))
      // reversed the image created by drops
      let px= (width/2)/ 50 // try and get the right spot
      let clr = myvideo.get(myvideo.width - this.pos.x / px, this.pos.y / 8);
      fill(clr[0], clr[1], clr[2]);
      ellipse(this.pos.x, this.pos.y, 12 * 2);
      //image(clr,this.pos.x, this.pos.y,55,55);
      pop();
    } else if (state === 0) {
      push();
      translate(this.pos.x, this.pos.y);
      let clr = myvideo.get(
        floor(this.pos.x / 12),
        floor(this.pos.y / 12),
        55,
        55
      );
      //print(clr)
      //fill(clr[0],clr[1],clr[2])
      //ellipse(this.pos.x, this.pos.y, this.r * 2);

      image(clr, this.pos.x, this.pos.y);
      pop();
    }

    //ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
