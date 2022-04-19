var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var pterodGroup, pterod, pterodImg;

//DESAFIO 2 criar variável de grupo para o pterodáctilo 

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

//DESAFIO 1. CARREGAR AS ANIMAÇÕES PARA O CÓDIGO AQUI 
pterodImg = loadAnimation("pterodactilo1.png", "pterodactilo2.png", "pterodactilo3.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(width/2,180,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,70);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,110);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  pterodGroup = new Group();

  score = 0;
}

function draw() {

  background(255);
  text("Score: "+ score, 1500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    trex.changeAnimation("running", trex_running);
    
    if(touches.lenght>0 || keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
      touches = [];
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);

    spawnClouds();
    spawnObstacles();
    pterodactilo()

    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
 
    trex.changeAnimation("collided",trex_collided);
 
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    pterodGroup.destroyEach();

    if(mousePressedOver(restart)) {
      reset();
    }
  }
    
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,165,10,40);
 
    obstacle.velocityX = -(6 + 3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
               
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 
    obstaclesGroup.add(obstacle);
  }
}

//DESAFIO 1. CRIAR A FUNÇÃO 

function pterodactilo(){

  //DESAFIO2 - CONDIÇÃO DE FRAME COUNT PARA GERAR O PTERODÁCTILO A CADA 100 QUADROS AQUI
  if(frameCount % Math.round(random(80,100))==0){
    pterod = createSprite(600, 20, 20, 20);
    pterod.velocityX = -5;
    pterod.addAnimation("pterod", pterodImg);
    pterod.scale = 0.08;
    pterod.y=Math.round(random(10,150));
    pterodGroup.add(pterod);
    pterod.lifetime = 200;
    //pterod.depth = cloud.depth;
  }
  
  //DESAFIO 2. COLOCAR O PTERODÁTILO PARA aparecer de forma aleatória no eixo Y AQUI


  //DESAFIO2. CORRIGIR erro do ajuste da profundidade
  

  //DESAFIO 2. adicionar tempo de vida 

     
  //DESAFIO2. ADICIONAR GRUPO AO SPRITE AQUI

  

 }