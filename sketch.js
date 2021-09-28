//preload suono (con correzioni)
let mySound;
function onSoundLoadSuccess(e) {
  console.log("load sound success", e);
}
function onSoundLoadError(e) {
  console.log("load sound error", e);
}
function onSoundLoadProgress(e) {
  console.log("load sound progress", e);
}
function preload() {
  soundFormats("mp3", "ogg");
  mySound = loadSound(
    "assets/scarySound.mp3",
    onSoundLoadSuccess,
    onSoundLoadError,
    onSoundLoadProgress
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);

  mySound.setVolume(1);
  test();

  //gradient background
  background("220");
  var color1 = color("midnightBlue");
  var color2 = color("indigo");
  setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == "Y") {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis == "X") {
      // Left to right gradient
      for (let j = x; j <= x + w; j++) {
        var inter2 = map(j, x, x + w, 0, 1);
        var d = lerpColor(c1, c2, inter2);
        stroke(d);
        line(j, y, j, y + h);
      }
    }
  }
}

function draw() {
  movingSquare(); //bordi
  translate(width / 2, height / 2); //assi al centro

  push(); //spirale che ruota isolata
  rotatingSpiral();
  pop();

  happyFace(); //faccina
  if (frameCount > 400) {
    //jumpscare
    scale(15);
    happyFace();
  }
}
//codice faccia
let r = 1;
let g = 1;
let b = 1;
function happyFace() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  fill(r, g, b);
  noStroke();
  rect(0, 0, 100, 100);

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  fill(r, g, b);
  noStroke();
  circle(0, 0, 100);

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  fill(r, g, b);
  noStroke();
  circle(0, 0, 85);

  //FACE
  //smile
  noFill();
  stroke(1);
  strokeWeight(4);
  arc(0, 0, 50, 50, 5, 175);

  //eyes
  fill("black");
  noStroke();
  circle(-20, -15, 10);
  circle(20, -15, 10);

  //evil jumpscare
  if (frameCount > 400) {
    fill("red");
    noStroke();
    circle(-20, -15, 6);
    circle(20, -15, 6);

    noFill();
    stroke(1);
    strokeWeight(4);
    line(-30, -25, -9, -12);
    line(30, -25, 9, -12);
  }
}
//codice spirale
let angle = 0;
let radius = 0;
function rotatingSpiral() {
  noFill();
  stroke("yellow");
  strokeWeight(4);
  rotate(angle);
  angle += 30;
  radius += 0.6;
  point(radius, 0);

  if (frameCount > 200) {
    angle += 30;
  }

  if (frameCount > 400) {
    noLoop();
  }
}
//codice bordi
let hp2 = 1;
let hp = 1;
function movingSquare() {
  fill("rebeccaPurple");
  square(20 * hp, 0, 20);
  square(20 * hp, windowHeight, 20);

  fill("yellow");
  square(20 * hp2, 0, 20);
  square(20 * hp2, windowHeight, 20);
  hp = hp + 2;
  hp2 = hp2 + 2;
}

function test() {
  mySound.play();
  console.log("ahahahahhah");
}
