//Create variables here
var Dog, HappyDogImg, DogImg, database,FoodS, food,button, button2, fedTime;
var start = 0, play = 1, garden = 2, WashRoom = 3 ,BedRoom = 4 ,LivingRoom = 5;
var gameState = 0; 
var gar, WashRoomIMG ,BedRoomIMG ,LivingRoomIMG;

function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogImg1.png");
  gar = loadImage("images/Garden.png");
  WashRoomIMG = loadImage("images/Wash Room.png");
  BedRoomIMG = loadImage("images/Bed Room.png");
  LivingRoomIMG = loadImage("images/Living Room.png");
}

function setup() {
	createCanvas(1000, 500);
  
  database = firebase.database();

  food = new Food();

  Dog = createSprite(850, 300, 50, 50);
  Dog.addImage(DogImg);
  Dog.scale = 0.2;

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  });

  

  if(gameState === start)
{
  var heading = createElement("h2");
  heading.html("VIRTUAL PET");
  heading.position(750, 100);
  var Name = createInput("Write Your Dog's Name");
  Name.position(750, 300);
  var on = createButton(" start game ");
  on.position(795, 400);
  on.mousePressed(function()
    {
      heading.hide();
      Name.hide();
      on.hide();
      gameState = play;
    })
}

}


function draw() {
background("green");

if(gameState === garden)
  {
    image(gar, 0, 0, width, height);
    textSize(30);
    fill(0);
    text("1 hour later", 450, 100);
    var but = createButton(" Back ");
    but.position(1300, 500);

    but.mousePressed(() =>
    {
      removeElements();
      gameState = play;
    })
  }

if(gameState === play)
{
  food.display();

  button = createButton(" Feed Your Dog ");
  button.position(900, 70);

  button2 = createButton(" Increase Your Food Stock ");
  button2.position(1100, 70);

  button.mousePressed(function ()
  {
    Dog.addImage(HappyDogImg);
    food.writeStock();
    lastFed = hour();
    frameCount = 0;
    var rand = floor(random(1, 5));
    console.log(rand);
    removeElements();
    switch(rand)
    {
      case 1 : gameState = garden;
      break;
      case 2 : gameState = WashRoom;
      break;
      case 3 : gameState = BedRoom;
      break;
      case 4 : gameState = LivingRoom;
      break;
    }
  })

  if(frameCount % 160 === 0)
  {
    Dog.addImage(DogImg);
  }

  button2.mousePressed(function ()
  {
    food.addStock();
  })

  drawSprites();
  //add styles here

  textSize(15);
  fill("white");
  text("YOUR FOOD STOCK IS " + FoodStock, 150, 150);
  fill(255, 255, 254);
  textSize(15)


  if(lastFed >= 12)
  {
    text("Last Fed : " + lastFed % 12 + " PM", 350, 30);
  }
  else if(lastFed === 0)
  {
    text("Last Fed : 12 AM", 350, 30);
  }
  else if(lastFed <= 12)
  {
    text("Last Fed : " + lastFed + " AM", 350, 30);
  }
}

if(gameState === LivingRoom)
{
  image(LivingRoomIMG, 200, 0, 600, height);
  textSize(30);
    fill(0);
  text("2 hour later", 450, 100);
    var but = createButton(" Back ");
    but.position(1300, 500);

    but.mousePressed(() =>
    {
      removeElements();
      gameState = play;
    })
}

if(gameState === BedRoom)
{
  image(BedRoomIMG, 200, 0, 600, height);
  textSize(30);
    fill(0);
  text("4 hour later", 450, 100);
    var but = createButton(" Back ");
    but.position(1300, 500);

    but.mousePressed(() =>
    {
      removeElements();
      gameState = play;
    })
}

if(gameState === WashRoom)
{
  image(WashRoomIMG, 200, 0, 600, height);
  textSize(30);
    fill(0);
  text("3 hour later", 450, 100);
    var but = createButton(" Back ");
    but.position(1300, 500);

    but.mousePressed(() =>
    {
      removeElements();
      gameState = play;
    })
}
}

function readStock(data)
{
  FoodStock = data.val();
}

function defaultStock()
{
  database.ref('/').update(
    {
      'food' : 20
    }
  )
}