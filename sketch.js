let myvideo;
let vScale; // global video scaling variable
let particles = [];
let cnv; // holds the canvas
let missle; // hold missle image
let drop; // hold drop image
let waters; // hold water sound
let wars; // hold warsound
let state = 1; // hold the state of the shower
let lasttouch = 0; // for debouncing touch
let first = true; // boolean for first touch

CanvasRenderingContext2D.willReadFrequently = true;
function setup() {
  cnv = createCanvas(windowWidth,windowHeight) //createCanvas(600, 800);
  //let cx = floor((windowWidth - cnv.width) / 2);
  //let cy = floor((windowHeight - cnv.height) / 2);
  //cnv.position(cx, cy);
  imageMode(CENTER);
  if (width < height) {
    vScale = floor(width / 200); // vScale tied to window width so it can work on phone and computer
    console.log("by width");
  } else {
    vScale = floor(height / 200);
    console.log("by height");
  }
  pixelDensity(1);
  noCursor();
  myvideo = createCapture(VIDEO);
  myvideo.size(50, 150);
  myvideo.hide();
  // video dom element , the source, will be smaller by vScale which is 40 by 30 to improve performance
  //frameRate(15);
  noSmooth();
}

function touchStarted() {
  // for Ios
  // calculate time since last touch
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    if (first) {
      first = false;
      print("first time");
    }
    //state++;
    //state = state % 2;

    // update
    lasttouch = currenttime;
  }
}

function mousePressed() {
  touchStarted();
  // for firefox computer browsers
}
function draw() {
  background(0, 10);

  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(width/4+25, 20));
  }

  for (let particle of particles) {
    let gravity = createVector(0, 0.5);
    particle.applyForce(gravity);
    particle.update();
    particle.show();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}
