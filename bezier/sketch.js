function setup() {
  createCanvas(600, 600);
  p0 = createVector(10,200);
  p1 = createVector(150,100);
  p2 = createVector(600-150,500);
  p3 = createVector(600-10,200);
  
}

function draw() {
  p1 = createVector(mouseX, mouseY);
  background(50);
  noFill();
  dotti(p0);
  dotti(p1);
  dotti(p2);
  dotti(p3);
   strokeWeight(1);
 text("haha", p2.x+2,p2.y+2);
  stroke(255, 102, 0);
  strokeWeight(2);
  line(p0.x,p0.y,p1.x,p1.y);
  line(p2.x,p2.y,p3.x,p3.y);
  stroke(100, 0, 0);
  bezier(p0.x,p0.y,p1.x,p1.y, p2.x,p2.y,p3.x,p3.y);
  
  for(t=0; t<=1.0000001;t+=0.01){
    
        
    mylerp3d(p0, p1, p2, p3,  t)
    
    
  }
}

function mylerp3d(p0, p1, p2, p3, t){
  
  let v0 = mylerp2d(p0, p1, p2, t);
  let v1 = mylerp2d(p1, p2, p3, t);
  
  let v3 =  mylerp(v0, v1,t)  
  dotti(v3,3);
  return v3
  
}

function mylerp2d(p0, p1, p2, t){
  
  let v0 = mylerp(p0,p1,t);
  let v1 = mylerp(p1,p2,t)
  
  let v2 = mylerp(v0, v1,t);
  dotti(v2, 2);
  return  v2;
  
}


function mylerp(p0, p1, t){
  let x = p0.x+t*(p1.x-p0.x);
  let y = p0.y+t*(p1.y-p0.y);
  
  let v = new createVector(x,y);
  dotti(v, 0);
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
 
  
    strokeWeight(5); // Make the points 10
  point(v.x, v.y);
}
