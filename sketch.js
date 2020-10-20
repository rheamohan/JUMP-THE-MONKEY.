var monkey, monkeyImg;
var ground, groundImage
var invisibleGround;

var stoneImg;
var BananaImg;

var stoneGroup,stoneImg;
var bananaGroup,bananaImg;

var score;

var Play = 1;
var End = 0;
var GameState = Play;

var restart,restartImg;
var GameOver,GOimg;

function preload(){
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyCollided = loadAnimation("collided.png");
  
  groundImage = loadImage("jungle.jpg");
  
  BananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  
  restartImg = loadImage("restart.jpg");
  GOimg = loadImage ("Gameover.PNG");
}

function setup() {
  createCanvas(600, 400);
  
  ground = createSprite(200,180,1500,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
  ground.scale= 1.2;
  
  monkey= createSprite(50,380,20,50);
  monkey.addAnimation("Monkey", monkeyImg);
  monkey.scale = 0.1;
  //monkey.debug = true;
  monkey.setCollider("circle",5,70,200)
  
  monkey.addAnimation("collided",monkeyCollided);
  
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  
  restart = createSprite (300,290,400,10);
  restart.addImage ("restart",restartImg);
  restart.scale = 0.2;
    
  GameOver = createSprite (300,150,350,20);
  GameOver.addImage ("GameOver",GOimg);
  GameOver.scale = 0.7;
  
  restart.visible = false;
  GameOver.visible = false;
}

function draw() {
  background(180);
  
  if (GameState === Play){
    
     if (ground.x < 0){
    ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 355)  {
    monkey.velocityY = -12;
    }
    
    if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score+2;
    }
    
    if (monkey.isTouching(stoneGroup)){
      GameState = End;
    }
    
    monkey.velocityY = monkey.velocityY + 0.3;
    
    spawnBanana();
    spawnStone();
    
    ground.velocityX = -4;
    
  } 
  
  else if (GameState ===End){
    
    // VELOCITIES
    monkey.velocityY = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    
    // LIFETIME
    stoneGroup.setLifetimeEach(-1);
    
    //
    monkey.changeAnimation ("collided",monkeyCollided);
    
    GameOver.visible = true;
    restart.visible = true;
  }
  
  monkey.collide(invisibleGround);
  
   if (mousePressedOver(restart)){
  reset();
  }
  
 
  drawSprites();

// SCORE
  stroke("black");
  fill("black");
  textSize(24)
  text("Score: "+ score, 350,50);
  //score = score + Math.round(getFrameRate()/60);
  
}

function reset(){
  // ALL THIS SHOULD HAPPEN IN RESET STATE 
  GameState = Play;
  
   GameOver.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  // BEACUSE WE HAVE GIVEN MONEY ANIMATION DIFF. IN END STATE SO     WE HAVE TO GIVE THE SAME 
  // ANIMATION AS GAME STATE HERE ALSO
  monkey.changeAnimation("Monkey",monkeyImg);
  //TO LET SCORE COME TO _0_ WHEN IT IS RESET
  score = 0; 
}

function spawnBanana() {
  //write code here to spawn the Banana
  if (frameCount % 80 === 0) {
    var Banana = createSprite(600,120,40,10);
    Banana.y = Math.round(random(90,200));
    Banana.addImage(BananaImg);
    Banana.scale = 0.050;
    Banana.velocityX = -10;
    //assign lifetime to the variable
    Banana.lifetime = 200;
    //adjust the depth
    Banana.depth = monkey.depth + 1;
    //add each cloud to the group
    bananaGroup.add(Banana);
  }
}

function spawnStone() {
  if(frameCount % 100 === 0) {
    var stone = createSprite(600,360,10,40);
    stone.addImage(stoneImg)
    stone.velocityX = -4;
    //assign scale and lifetime to the stone           
    stone.scale = 0.13;
    stone.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(stone);
  }
}