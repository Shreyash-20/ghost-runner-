var ghost,ghostimg;
var tower, towerimage;
var invisibleground;
var door,doorimage ;
var grillImage,grill;
var gameState="play"
var doorGroup;
var grillGroup;

function preload() {
  ghostimg=loadAnimation("ghost1.png","ghost2.png", "ghost3.png");
  towerimage=loadImage("brick.jpg")
  doorimage=loadImage("door.png")
  grillImage=loadImage("r.png");
}

function setup(){
  createCanvas(600,600);

  
  tower=createSprite(300,300);
  tower.addImage("tower",towerimage);
  tower.velocityY=6
  
    ghost=createSprite(400,200,10,10);
  ghost.addAnimation("ghost",ghostimg);
  ghost.scale=0.5;
  
  invisibleground=createSprite(300,590,600,10);
  invisibleground.visible=false;
  
  doorGroup=new Group();
  grillGroup=new Group();
}


function draw(){

  //background("gold");
  text(mouseX+","+mouseY,mouseX,mouseY)
  if(gameState=="play"){ 
  
 if(tower.y>300){
  tower.y=200; 
 }
  if(keyDown("space")){
  ghost.velocityY=-9  ;  
  }
  
  if(keyDown("right")){
  ghost.x=ghost.x+3;
    
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  ghost.velocityY+=0.8; 
  
  ghost.collide(invisibleground);
  spawndoor();
    if(grillGroup.isTouching(ghost)){ 
    ghost.velocityY=0;
      gameState="END";
    }
  }
  drawSprites();
  if(gameState=="END"){ 
  doorGroup.setVelocityYEach(0);
    tower.velocityY=0;
    grillGroup.setVelocityYEach(0);
    stroke("blue")
    fill("yellow")
    textSize(40)
    text("GAMEOVER",230,350)
  
  }
}
function spawndoor(){
  if(frameCount%60==0){ 
 door=createSprite(50,10,10,10);  
 door.addImage(doorimage);
  door.scale=0.07;
  door.velocityY=5;
    door.x=Math.round(random(50,550));
grill=createSprite(50,50,10,10);
   grill.velocityY=5;
    grill.addImage(grillImage)
  grill.scale=0.1;                        
    grill.x=door.x;
    door.depth=ghost.depth;
    grill.depth=ghost.depth;
    ghost.depth=ghost.depth+1;                
    doorGroup.add(door);
    grillGroup.add(grill);
    
  }
  
}
