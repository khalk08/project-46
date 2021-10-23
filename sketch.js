//task for today: add diamonds and increase score once boy touches the diamonds

var gameState = 0;
var backgroundImg, paperImg;
var backgroundImg1, backgroundImg2;
var boy, boyImg, ground, groundImg;
var demon1, demon1Img, demon2, demon2Img, demon3, demon3Img, demon4, demon4Img;
var diamond1, diamond1Img, diamon2, diamond2Img;
var diamondsGroup;
var obstaclesGroup;
var score=0;

function preload(){
   backgroundImg = loadImage("images/background.jpg");
   paperImg = loadImage("images/paper.png");
   backgroundImg1 = loadImage("images/background1.jpg");
   backgroundImg2 = loadImage("images/background2.jpg");
   boyImg = loadImage("images/homeboy.gif");
   groundImg = loadImage("images/ground2.png");

   demon1Img = loadImage("images/demon1.png");
   demon2Img = loadImage("images/demon2.png");
   demon3Img = loadImage("images/demon3.gif");
   demon4Img = loadImage("images/demon4.gif");

   diamond1Img = loadImage("images/diamond1.gif");
   diamond2Img = loadImage("images/diamond2.gif");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  boy = createSprite(100, windowHeight-150, 20,20);
  boy.addImage("boy", boyImg);
  boy.visible = false;

  ground = createSprite(600, windowHeight-75, windowWidth+400 ,20);
  ground.addImage("ground", groundImg);
  ground.visible = false;
  ground.velocityX = -3;

  demon2 = createSprite(windowWidth, windowHeight-165, 20,20);
  demon2.addImage("demon2", demon2Img);
  demon2.visible = false;
  demon2.velocityX = -4;
  demon2.scale = 0.3;

  demon1 = createSprite(windowWidth-240, windowHeight-160, 20,20);
  demon1.addImage("demon1", demon1Img);
  demon1.visible = false;
  demon1.velocityX = -4;
  demon1.scale = 0.3;

  demon3 = createSprite(windowWidth-240, windowHeight-155, 20,20);
  demon3.addImage("demon3", demon3Img);
  demon3.visible = false;
  demon3.velocityX = -4;
  demon3.scale = 0.3;

  demon4 = createSprite(windowWidth-240, windowHeight-150, 20,20);
  demon4.addImage("demon4", demon4Img);
  demon4.visible = false;
  demon4.velocityX = -4;
  demon4.scale = 0.3;

  diamond1 = createSprite(windowWidth/2, Math.round(random(200, 400)), 20,20 );
  diamond1.addImage("diamond1", diamond1Img);
  diamond1.visible = false;
  diamond1.velocityX = -4;
  diamond1.scale = 0.1;

  diamond2 = createSprite(windowWidth/2,Math.round(random(200, 400)), 20,20 );
  diamond2.addImage("diamond2", diamond2Img);
  diamond2.visible = false;
  diamond2.velocityX = -4;
  diamond2.scale = 0.1;

  obstaclesGroup = new Group();
  diamondsGroup = new Group();
}

function draw(){
  if(gameState === 0){
    background(backgroundImg);

    obstaclesGroup.destroyEach();
    diamondsGroup.destroyEach();

    image(paperImg, 300, 200, 850,300);
    textSize(25)
    fill("black")
    text(" hey! welcome to my game! \n if you want to know the story of my game, press the up arrow key, \n if you want to directly play the game, press the space key!",
    350, windowHeight/2);

    if(keyCode === 38){
      gameState = 1.1;
    }

    if(keyCode === 32){
      gameState = 1.2;
    }
  }

  if(gameState === 1.1){
    background(backgroundImg1);
    textSize(25)
    fill("white")
    text(" Not long ago, demons had invaded my \n village, becasue of that, many people \n felt the urge to buy all the resources like \n food and water and lock themselves \n indoors, in the daytime there's always \n a huge crowd of people buying food \n which makes it hard for me to buy \n resources for my family. So I always \n go out at night to buy my family food, \n but at night is when the demons are \n out... \n Help me reach home safely with all the \n resources for my family! Press 'space'  \n to play the game!",
    470, 145);  

    if(keyCode === 32){
      gameState = 1.2;
    }

   }

  if(gameState === 1.2){
    background(backgroundImg1);
    boy.visible = true;
    ground.visible = true;
    obstaclesGroup.setVisibleEach = true;
    diamond1.visible = true;
    diamond2.visible = true;

  textSize(20);
  text("score: " +  score, windowWidth-100, 25);

  if(keyDown("space")){
    boy.velocityY = -7;
  }

  boy.velocityY = boy.velocityY + 0.6;
  boy.collide(ground);

  if(ground.x < 200){
    ground.x = 500;
  }

  if(diamondsGroup.isTouching(boy)){
    score =  score + 10;
  }
 }

  spawnObstacles();
  spawnDiamonds();

  if(obstaclesGroup.isTouching(boy)){
    gameState = 2;
  }

  if(gameState === 2){
    background(backgroundImg2);
    textSize(30)
    fill("black")
    text("GAME OVER! \n", 200,150)

    textSize(30)
    fill("black")
    text("Well done for completing the game! You played well! \n by Khaliya", 200,190);

    boy.visible = false;
    ground.visible = false;

    obstaclesGroup.destroyEach();
    diamonsGroup.destroyEach();
  }
  

  drawSprites();
  
}

function spawnObstacles(){
  if(frameCount % 100 === 0) {
   demon = createSprite(windowWidth, windowHeight/2+200, 20, 20);
   demon.debug = true;
   demon.velocityX = -6;
   var rand = Math.round(random(1,4));
    switch(rand) {
     case 1: demon.addImage(demon1Img);
             break;
     case 2: demon.addImage(demon2Img);
             break;
     case 3: demon.addImage(demon3Img);
             break;
     case 4: demon.addImage(demon4Img);
             break;
   default: break;
 }
  demon.scale = 0.3;
  demon.lifetime = 300;
  obstaclesGroup.add(demon);
 }
}

function spawnDiamonds(){
  if(frameCount % 100 === 0) {
    diamond = createSprite(windowWidth/2,Math.round(random(200, 400)), 20,20);
    diamond.debug = true;
    diamond.velocityX = -4;
    var rand = Math.round(random(1,2));
     switch(rand) {
      case 1: diamond.addImage(diamond1Img);
              break;
      case 2: diamond.addImage(diamond2Img);
              break;
    default: break;
  }
   diamond.scale = 0.1;
   diamond.lifetime = 300;
   diamondsGroup.add(diamond);
  }
}
