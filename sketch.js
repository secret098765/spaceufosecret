//initiate Game STATEs
var PLAY = 1;
var END = 0;
var score=0;
var gameState = PLAY;
var sprite,trex;
function preload(){
  treximg = loadAnimation("trex.png")
  trexing=loadAnimation("trex3.png")
  ob1=loadImage("obstacle.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  clou=loadImage("clou.png")
  img=loadAnimation("trex.2.png")
  re=loadImage("restart.png")
  go=loadImage("Gameover.png")
  bg =loadImage("background.png")
  end = loadAnimation("end.png")
  lr=loadImage("laser.png")
}

function setup(){ 
 trex = createSprite(200,380,20,50);
trex.addAnimation("trex",treximg);
trex.addAnimation("end",end)
trex.addAnimation("stable",trexing)
trex.setCollider("circle",0,0,40);
trex.addAnimation("right",img)
//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
 ground = createSprite(200,380,1000,20);
ground.visible=false;
ground.x = ground.width /2;

//invisible Ground to support Trex
 invisibleGround = createSprite(200,385,4000,5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
 ObstaclesGroup = createGroup();
CloudsGroup = createGroup();
 gameover = createSprite(50, 200);
gameover.addImage(go);
 restart = createSprite(50, 300);
restart.addImage(re);

//set text
textSize(20);
textFont("Georgia");
textStyle(BOLD);
gameover.visible = false;
restart.visible = false;

//score
 count = 0;
trex.setCollider("circle", 0, 0, 40);
trex.debug = true;
}
function draw() {
  background(bg);

  //set background to white
  //display score
  text("Score: "+ score, 250, 100);
  console.log(gameState);
  

  
  if(gameState === PLAY){
  
    if(keyWentDown("right")){

      trex.x=trex.x+10 ;
      trex.changeAnimation("right")
    
    }
    if(keyWentDown("left")){

      trex.x=trex.x-10 ;
      trex.changeAnimation("trex")
    
    }
    if(keyDown("space")){

      laser()
}
if(keyWentUp("right")||keyWentUp("left")){
  trex.changeAnimation("stable")
}


    //move the ground
    camera.position.x=trex.x;
    ground.velocityX = -6;
    //scoring
    score =score+Math.round(getFrameRate()/60)
    
    if (ground.x <0){
ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    
    spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      
    }
    if(sprite!=null&&ObstaclesGroup.isTouching(sprite)){ObstaclesGroup.destroyEach()}
  }

  
  if(gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;

    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("end");
    gameover.visible = false;
    restart.visible = 3;
  }
  
  
  console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();

}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(random(10,300),15,10,40);
    obstacle.velocityY = +6;
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(ob1);
       obstacle.scale = 0.9;
               break;       
       case 2: obstacle.addImage(ob2);
       obstacle.scale = 0.5;
               break;
       case 3: obstacle.addImage(ob3);
       obstacle.scale = 0.2;
               break;
       case 4: obstacle.addImage(ob4);
       obstacle.scale = 0.2;
               break;
       case 5: obstacle.addImage(ob5);
       obstacle.scale = 0.1;
               break;
       case 6: obstacle.addImage(ob6);
       obstacle.scale = 0.1;
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     ObstaclesGroup.add(obstacle);
  }
 }

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 10 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(10,400);
    cloud.addImage(clou);
    cloud.scale = 6;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}

function laser(){
sprite=createSprite(trex.x,trex.y)
sprite.addImage(lr)
sprite.velocityY=-10
sprite.scale=0.1;

}