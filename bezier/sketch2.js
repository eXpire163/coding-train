const boxsize = 600;
const stepSize = 0.1;
const colorSpeed = 3;


let timer = 0.0000001;

let showlert1 = false;


function setup() {
  
  createCanvas(boxsize, boxsize);
  p0 = createVector(10,boxsize/2);
  p1 = createVector(150,100);
  p2 = createVector(boxsize-p1.x,boxsize-p1.y);
  p3 = createVector(boxsize-10,boxsize/2);
  
  colorMode(HSB);
}

function draw() {
  if(mouseY<boxsize && mouseY>=10){
     p1 = createVector(mouseX,mouseY);
     p2 = createVector(boxsize-p1.x,boxsize-p1.y);
    
  }
  else{
     p1 = createVector(150,100);
    p2 = createVector(boxsize-p1.x,boxsize-p1.y);
  }
  
  
  background(50);
  noFill();
  dotti(p0);
  dotti(p1);
  dotti(p2);
  dotti(p3);
   strokeWeight(3);
 // text("haha", p2.x+2,p2.y+2);
  stroke(255, 102, 0);
  strokeWeight(2);
  //line(p0.x,p0.y,p1.x,p1.y);
  //line(p2.x,p2.y,p3.x,p3.y);
  //stroke(100, 0, 0);
  //bezier(p0.x,p0.y,p1.x,p1.y, p2.x,p2.y,p3.x,p3.y);

  timer += colorSpeed;
  for(t=0; t<=1-stepSize;t+=stepSize){
    
        
    let t1 = t;
    let t2 = t*t;
    let t3 = t*t*t;
    
 //   let p = p0 + 
 //       t1*(-3*p0 + 3*p1) + 
 //       t2*(3*p0 + 6*p1+ 3*p3) + 
 //       t3*(-1*p0 + 3*p1+ -3*p2 + p3) 
    
    let term1 = (p0.mult(-3).add(p1.mult(3))).mult(t1)
    let term2 = (p0.mult(3).add(p1.mult(6)).add(p2.mult(3))).mult(t2)
    let term3 = (p0.mult(-1).add(p1.mult(3)).add(p2.mult(-3)).add(p3)).mult(t3)
    
    let p = p0.add(term1).add(term2).add(term3);
    //console.log(p);
    
    dotti(p,3)
    
    stroke((t * 360+timer)%360, 255, 255);
    // line(t1.x, t1.y, t2.x, t2.y);
    
    //let mix = t1.add(t2);
    // console.log(mix)
    
    // dotti(mix, 3);
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
 
  
    strokeWeight(1); // Make the points 10
  point(v.x, v.y);
}
