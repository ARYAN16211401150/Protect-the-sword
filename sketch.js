var wizard;
var wizardImg;
var sword, swordImg;
var orc1, orcsImg, orcsGroup;
var orc2, orcs2Group;
var dragon1, dragonImg, dragonGroup;
var fire1, fireImg, fireGroup;
var blaze1, blazeImg, blazeGroup;
var bolt1, boltImg, boltGroup;
var lives = 3;
var lifeImg;
var gameState = "start"
var backgroundImg;

function preload()
{
   wizardImg=loadImage("wizard.png");
   swordImg=loadImage("sword.png");
   orcsImg=loadAnimation("orc1.png" , "orc3.png" , "orc5.png" , "orc7.png");
   dragonImg=loadAnimation("dragon1.png" , "dragon2.png" , "dragon3.png" , "dragon4.png" , "dragon5.png");
   fireImg=loadAnimation("fire2.png");
   blazeImg=loadAnimation("blaze.png");
   boltImg=loadAnimation("bolt1.png");
   lifeImg=loadImage("life.png")
   backgroundImg=loadImage("background.jpg");
}
function setup() {
  createCanvas(1500,750);
  wizard = createSprite(300, 600, 50, 50);
  wizard.addImage(wizardImg);
  wizard.scale=0.5;

  sword = createSprite(100, 400, 50, 50);
  sword.addImage(swordImg);
  sword.scale=0.5;

  orcsGroup = createGroup();
  orcs2Group = createGroup();
  dragonGroup = createGroup();
  fireGroup = createGroup();
  blazeGroup = createGroup();
  boltGroup = createGroup();

}

function draw() {

  if(gameState === "start")
  {
    background(backgroundImg);
    textSize(40);
    fill("red");
    text("PROTECT THE SWORD", width/2-200, 250);
    textSize(24);
    text("Press 'X' for bolt to destroy dragons", width/2-180, 300);
    text("Press 'N' for blaze to destroy large orcs", width/2-180, 330);
    text("Press 'space' for fire to destroy small orcs", width/2-180, 360);
    text("Press 'T' to start the game!!", width/2-150, 390);
  }
  if(keyDown("t"))
  {
    gameState="play";
  }

  if(gameState === "play"){
  background(backgroundImg);
  
  textSize(20);
  fill("white");
  text("lives", 80,15);
  for(var i=1;i<=lives;i++)
  {
    image(lifeImg,35*i,20,50,50);
  }
  createOrcs();
  createOrcs2();
  createDragons();
  wizard.y=mouseY;

  if(keyDown("space"))
  {
     createFire();
  }

  if(keyDown("n"))
  {
     createBlaze();
  }

  if(keyDown("x"))
  {
     createBolt();
  }

  if(fireGroup.isTouching(orcsGroup))
  {
    for(var i =0;i<orcsGroup.length;i++){
    orcsGroup.get(i).destroy();
    }
    for(var i =0;i<fireGroup.length;i++){
    fireGroup.get(i).destroy();
    }
  }

  if(blazeGroup.isTouching(orcsGroup))
  {
    for(var i =0;i<orcsGroup.length;i++){
    orcsGroup.get(i).destroy();
    }
    for(var i =0;i<blazeGroup.length;i++){
    blazeGroup.get(i).destroy();
    }
  }

  if(boltGroup.isTouching(orcsGroup))
  {
    for(var i =0;i<orcsGroup.length;i++){
    orcsGroup.get(i).destroy();
    }
  }

  if(boltGroup.isTouching(orcs2Group))
  {
    for(var i =0;i<orcs2Group.length;i++){
    orcs2Group.get(i).destroy();
    }
  }

  if(blazeGroup.isTouching(orcs2Group))
  {
    for(var i =0;i<orcs2Group.length;i++){
    orcs2Group.get(i).destroy();
    }
    for(var i =0;i<blazeGroup.length;i++){
    blazeGroup.get(i).destroy();
    }
  }

  if(boltGroup.isTouching(dragonGroup))
  {
    for(var i =0;i<dragonGroup.length;i++){
    dragonGroup.get(i).destroy();
    }
    for(var i =0;i<boltGroup.length;i++){
    boltGroup.get(i).destroy();
    }
  }

  if(orcsGroup.isTouching(wizard)||orcs2Group.isTouching(wizard)||dragonGroup.isTouching(wizard))
  {
    lives-=1;
    for(var i =0;i<orcsGroup.length;i++){
      orcsGroup.get(i).destroy();
      }
    for(var i =0;i<orcs2Group.length;i++){
      orcs2Group.get(i).destroy();
      }  
  }

  if(lives === 0||orcsGroup.isTouching(sword)||orcs2Group.isTouching(sword)||dragonGroup.isTouching(sword))
  {
    gameState = "end"
  }

  drawSprites();
}

  if(gameState === "end")
  {
    background("black")
    textSize(50);
    fill("red");
    text("GAME OVER", 670, 370);
    textSize(30);
    fill("blue");
    text("Press R to restart", 670, 420);
  }

  if(keyDown("r"))
  {
    gameState = "play";
    lives = 3;
  }
}
function createOrcs()
{
  if(frameCount%150===0)
  {
    orc1 = createSprite(1400, 400, 50, 50);
    orc1.addAnimation("running",orcsImg);
    orc1.velocityX=-5
    if(frameCount%600 === 0)
    {
      orc1.velocityX+=-20
    }
    orc1.scale=2.5;
    orc1.y=Math.round(random(50,700));
    orc1.lifetime=500;
    orcsGroup.add(orc1);
  }
}

function createFire()
{
  fire1 = createSprite(400, mouseY-90, 50, 50);
  fire1.addAnimation("running",fireImg);
  fire1.velocityX=3;
  fire1.scale=0.2;
  fire1.lifetime=500;
  fireGroup.add(fire1);
}

function createBlaze()
{
  blaze1 = createSprite(450, mouseY-90, 50, 50);
  blaze1.addAnimation("running",blazeImg);
  blaze1.velocityX=3;
  blaze1.scale=0.2;
  blaze1.lifetime=500;
  blazeGroup.add(blaze1);
}

function createBolt()
{
  bolt1 = createSprite(450, mouseY-90, 50, 50);
  bolt1.addAnimation("running",boltImg);
  bolt1.velocityX=3;
  bolt1.scale=0.3;
  bolt1.lifetime=500;
  boltGroup.add(bolt1);
}

function createOrcs2()
{
  if(frameCount%500===0)
  {
    orc2 = createSprite(1400, 400, 50, 50);
    orc2.addAnimation("running",orcsImg);
    orc2.velocityX=-5;
    orc2.scale=4;
    orc2.y=Math.round(random(100,650));
    orc2.lifetime=500;
    orcs2Group.add(orc2);
  }
}

function createDragons()
{
  if(frameCount%1000===0)
  {
    dragon1 = createSprite(1400, 400, 50, 50);
    dragon1.addAnimation("running",dragonImg);
    dragon1.velocityX=-5
    dragon1.scale=4;
    dragon1.y=Math.round(random(100,600));
    dragon1.lifetime=500;
    dragonGroup.add(dragon1);
  }
}