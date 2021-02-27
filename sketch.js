//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;
var dogImg,happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');  
}

function setup() {

  database = firebase.database();

  createCanvas(800, 700);

  dog = createSprite(500,200,30,30);
  dog.addImage('dog',dogImg);
  dog.scale = 0.1

  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage('dog',happyDogImg);
  }
  if(keyWentDown(DOWN_ARROW)){
    dog.addImage('dog',dogImg);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill('red');
  stroke('yellow');
  text("Press Up arrow key to feed Drago milk!!",50,25);


}


function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x =0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })

}

function showError(){
  console.log("Error in writing");
}



