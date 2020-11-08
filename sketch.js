var Play = 1;
var End = 0;
var Win = 2;

var gameState = 1;

var zombie, zombieImg;
var candy, candyImg;
var pumpkin, pumpkinImg;
var start, startImg;
var backgroundImg;
var score = 0;
var treats = 0;

function preload(){
zombieImg = loadImage("dog.png");
candyImg = loadImage("treats.png");
pumpkinImg = loadImage("rock.jpg");
backgroundImg = loadImage("background.jpg")
//startImg = loadImage("start.png")
}

function setup(){
createCanvas(1200, 400)
zombie = createSprite(100, 300, 20, 20);
zombie.addImage(zombieImg)
zombie.scale = 0.1;

candyGroup = new Group();
obstaclesGroup = new Group();

ground = createSprite(600, 385, 1200 ,10);

//start = createSprite(600, 80, 100, 50)
//start.addImage("game", startImg);
}
function draw(){

    if(gameState === Play){
        background(backgroundImg);
        score = score + 1

        food();
    obstacles();
    textSize(30)
    text("score : "  + score, 1000, 40);
    if(keyWentDown("space")) {
        zombie.velocityY = -20;
       // start.visible = false;
      }
      if(keyWentUp("space")){
        zombie.velocityY = 14;
    }
    zombie.velocityY = zombie.velocityY + 0.8

    if(candyGroup.isTouching(zombie)){
        candyGroup.destroyEach();
        treats = treats + 1;
       
     }

     

     text("treats Collected :" + treats, 700,40)

     if(obstaclesGroup.isTouching(zombie)){
         textSize(20)
         text("GAME OVER", 550, 40)
         ground.velocityX = 0;
         obstaclesGroup.setVelocityXEach(0);
         candyGroup.setVelocityXEach(0);

         gameState = End;
         
     }

     

      zombie.collide(ground);
      drawSprites();
  


    }else if (gameState === End){
        background(backgroundImg);
        drawSprites();
        textSize(50)
        text("GAME OVER", 550,200)

        end();
    } 
    
    

    
   
    
    

}
function food(){
if (frameCount % 250 === 0) {
    var candy = createSprite(1200, random(80, 200), 20, 20)
    candy.addImage("candy", candyImg);
     candy.scale = 0.1;
     candy.velocityX = -8;

     candy.lifetime = 200;
      
      candyGroup.add(candy);
      }
    }
function obstacles(){
    if (frameCount % 150 === 0) {
      var pumpkin = createSprite(1200, 350, 20, 20)
      pumpkin.addImage("pumpkin", pumpkinImg);
     pumpkin.scale = 0.2;
      pumpkin.velocityX = -8;
      pumpkin.lifetime = 200;
    
      obstaclesGroup.add(pumpkin)
    }

    function end(){
        if(obstaclesGroup.isTouching(zombie)){
            zombie.velocityX = 0;
            textSize(20)
         text("GAME OVER", 550, 40)
         ground.velocityX = 0;
         obstaclesGroup.setVelocityXEach(0);
         candyGroup.setVelocityXEach(0);
         pumpkin.lifetime = 0;
         candy.lifetime = 0;


         score = 0;


        }


    }

    }