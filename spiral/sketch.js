const boxSize = 500;
const colorSpeed = 3;
const magnitude = 20;

let timer = 0.0000001;

let trianglePoints = [];

function setup() {
  createCanvas(boxSize + 20, boxSize + 20);
  colorMode(HSB)
}

function draw() {

  trianglePoints[0] = createVector(10, 10);
  trianglePoints[1] = createVector(250, 500);
  trianglePoints[2] = createVector(500, 10);

  timer += colorSpeed;

  stroke((timer) % 255, 25, 200);
  strokeWeight(2);

  // draw outer triangle
  // this could be included in the loop but requires a separation of update and draw what makes it harder to read
  vectorLine(trianglePoints[0], trianglePoints[1]);
  vectorLine(trianglePoints[1], trianglePoints[2]);
  vectorLine(trianglePoints[2], trianglePoints[0]);

  for (let i = 0; i < 45; i++) {

    stroke((i * 30 + timer) % 255, 25, 200 - (i * 13));

    // create vector from start point to end point
    let p01 = trianglePoints[1].copy().sub(trianglePoints[0])
    // get the direction / normalized vector * predefined distance from start point
    let p01n = p01.copy().normalize().mult(magnitude)
    // draw line from previous corner to current point including the calculated vector pXXn
    vectorLine(trianglePoints[2], trianglePoints[0].add(p01n))

    let p12 = trianglePoints[2].copy().sub(trianglePoints[1])
    let p12n = p12.copy().normalize().mult(magnitude)
    vectorLine(trianglePoints[0], trianglePoints[1].add(p12n))

    let p20 = trianglePoints[0].copy().sub(trianglePoints[2])
    let p20n = p20.copy().normalize().mult(magnitude)
    vectorLine(trianglePoints[1], trianglePoints[2].add(p20n))

    if (p20.copy().mag() < magnitude) {
      break;
    }

  }

}

function vectorLine(v0, v1) {
  line(v0.x, v0.y, v1.x, v1.y);
}

function dotti(v, lvl) {
  if (lvl == 0) {
    stroke(100, 0, 0);
  }
  if (lvl == 2) {
    stroke(0, 0, 100);
  }
  if (lvl == 3) {
    stroke(200, 200, 200);
  }

  strokeWeight(8); // Make the points 10
  point(v.x, v.y);
}
