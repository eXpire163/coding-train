const boxsize = 600;
const stepSize = 0.1;
const colorSpeed = 3;


let timer = 0.0000001;

let showlert1 = false;

let p0,p1,p2,p3;

let valueX=0, valueY=0;

let posPoints = [];
let controlPoints = [];
let currentPoint = 0;

let areas = 4;

function setup() {
  
  createCanvas(boxsize+20, boxsize+20);
 
  for(let i = 0; i<areas+1;i++){ 
    
    posPoints[i] = createVector(10+(boxsize/areas*i),boxsize/2);
    
    controlPoints[i] =createVector(i*100,i*20+200);
    
  }
  //alert("setup")
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
    for(let i = 0; i<areas+1;i++){ 
       text(i+": "+controlPoints[i].x+" , "+controlPoints[i].y, 25,25*i+20);
    }
  if(mouseY<boxsize && mouseY>=10){
     controlPoints[currentPoint] = createVector(mouseX,mouseY);         
  }
  else{
     for(let i = 0; i<areas+1;i++){ 
        controlPoints[i] =createVector(i*100,i*20+200);    
     }
    
  }
    

  stroke(200, 255, 255);
    for(let i = 0; i<areas;i++){ 
      stroke(i*50, 255, 255);   
      beziLocked(
        posPoints[i],
        controlPoints[i],
        controlPoints[i+1],
        posPoints[i+1],
        (i<areas)
      )
    }
  
}

function beziLocked(pp1,cc1, cc2, pp2, locked = true, helper = true){
  //mirror to reach c1
  let ll1 = locked  ? cc1.copy().sub(pp1).mult(-1).add(pp1) : cc1
  strokeWeight(1);
  text("locked", ll1.x+10, ll1.y-10)
  line(pp1.x, pp1.y, ll1.x, ll1.y) // startline
  line(pp2.x, pp2.y, cc2.x, cc2.y) // endline
  
  beziAbsolute(pp1,ll1,cc2,pp2);
  
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
    

    strokeWeight(5);
    line(temp.x, temp.y, p.x, p.y);  
    let magnetude = p.copy().sub(temp).mag();
    strokeWeight(1);
    line(p.x, p.y, p.x, p.y+magnetude)
    temp = p;
  }
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
