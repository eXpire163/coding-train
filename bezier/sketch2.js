const boxsize = 600;
const stepSize = 0.1;
const colorSpeed = 3;


let timer = 0.0000001;

let showlert1 = false;

let p0,p1,p2,p3;

let valueX=0, valueY=0;

let controlPoints = [];
let currentPoint = 0;


function setup() {
  
  createCanvas(boxsize, boxsize);
  p0 = createVector(10,boxsize/2);
  p1 = createVector(boxsize/2,boxsize/2);  
  p2 = createVector(boxsize-10,boxsize/2);
 
  controlPoints = [
  createVector(10,10), 
  createVector(20,20), 
  createVector(30,30)
]

  
  
  colorMode(HSB);
  //draw2();
}

function mu(v0,v1){
  return p5.Vector.mult(v0,v1)
}
function ad(v0,v1){
  return p5.Vector.add(v0,v1)
}

function mouseClicked() {
    
  currentPoint = (currentPoint+1)%controlPoints.length;
}

function draw() {
  background(50);
  noFill();
   strokeWeight(1);
  text(currentPoint, 20,20);
  
  if(mouseY<boxsize && mouseY>=10){
     controlPoints[currentPoint] = createVector(mouseX,mouseY);
    c0 = controlPoints[0];
    c1 = controlPoints[1];
    c2 = controlPoints[2];
         
  }
  else{
     c0 = createVector(120,100);
     c1 = createVector(boxsize/2-c0.x,boxsize-c0.y);
     c2 = createVector(boxsize-30,boxsize-100);
  }
    
  stroke(0, 255, 255);
   dotti(p0);
//   dotti(c0);
  
   dotti(p1);
//   dotti(c1);
  
   dotti(p2);
// dotti(c2);
  
   strokeWeight(3);
  
  
  
stroke(100, 255, 255);
  beziAbsolute(p0,c0,c1,p1);  
  stroke(200, 255, 255);
  //locked c1
  
  
  beziLocked(p1,c1, c2, p2)
  
}

function beziLocked(p1,c1, c2, p2){
    l1 = c1.sub(p1).mult(-1).add(p1)
  strokeWeight(1);
  text("locked", l1.x+10, l1.y-10)
  beziAbsolute(p1,l1,c2,p2);
}

function beziAbsolute(p0, c0, c1, p1){
  
   dotti(p0);
   dotti(c0);
   dotti(p1);
   dotti(c1);
  
  timer += colorSpeed;
  let temp = p0;
  for(t=0; t<=1.000001;t+=stepSize){    
    
    //stroke((t * 360+timer)%360, 255, 255);
       
    const t1 = t;
    const t2 = t*t;
    const t3 = t*t*t;
    
    const term1 = mu(ad(   mu(p0,-3), mu(c0,3)),t1);
    const term2 = mu(ad(   mu(p0, 3), ad(mu(c0,-6), mu(c1,3))),t2)   
    const term3 = mu(ad(ad(mu(p0,-1), mu(c0,3)), ad(mu(c1,-3),mu(p1,1))), t3)
    
    const p = ad(ad(p0, term1),ad( term2, term3))
    
    const debug = false;
    if(debug){
      console.log(t)
      console.log(p0.x, "p0")
      console.log(term1.x, "term1")
      console.log(term2.x, "term2")
      console.log(term3.x, "term3")
      console.log(p.x, p.y, "final p");
    }
    
    line(temp.x, temp.y, p.x, p.y);    
    temp = p;
  }
}

function mylerp3d(p0, p1, p2, p3, t){
  
  let v0 = mylerp2d(p0, p1, p2, t);
  let v1 = mylerp2d(p1, p2, p3, t);
  
  let v3 =  mylerp(v0, v1,t)  
  // dotti(v3,3);
  return v3
  
}

function mylerp2d(p0, p1, p2, t){
  
  let v0 = mylerp(p0,p1,t);
  let v1 = mylerp(p1,p2,t)
  
  let v2 = mylerp(v0, v1,t);
  if(showlert1)
    line(v0.x, v0.y, v1.x, v1.y);
  return  v2;
  
}


function mylerp(p0, p1, t){
  let x = p0.x+t*(p1.x-p0.x);
  let y = p0.y+t*(p1.y-p0.y);
  
  let v = new createVector(x,y);
  // dotti(v, 0);
  return v;
}


function dotti(v,lvl){
  if(lvl==0){
    stroke(100, 0, 0);
  }
  if(lvl==2){
    stroke(0, 0, 100);
  }
  if(lvl==3){
    stroke(200, 200, 200);
  }
 
  
    strokeWeight(8); // Make the points 10
  point(v.x, v.y);
}
