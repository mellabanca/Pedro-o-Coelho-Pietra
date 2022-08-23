const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var lama;
var tarzan; 
var foodtruck;
var fiodental; 
var papelDeParede;
var magali;
var pedro;
var amora; 
var edward;
var piscapisca;
var hungry;
var tristeza;
var aviao;
var hungry1;
var jokenpo;
var tristeza1;
var salsa;

function preload(){
  papelDeParede = loadImage("./Imagens/background.png");
  magali = loadImage("./Imagens/melon.png");
  pedro = loadImage("./Imagens/Rabbit-01.png");
  piscapisca = loadAnimation("./Imagens/blink_1.png","./Imagens/blink_2.png","./Imagens/blink_3.png");
  hungry = loadAnimation("./Imagens/eat_0.png","./Imagens/eat_1.png","./Imagens/eat_2.png","./Imagens/eat_3.png","./Imagens/eat_4.png");
  tristeza = loadAnimation ("./Imagens/sad_1.png", "./Imagens/sad_2.png","./Imagens/sad_3.png");
  aviao = loadSound("./Sons/air.wav");
  hungry1 = loadSound("./Sons/eating_sound.mp3");
  jokenpo = loadSound("./Sons/rope_cut.mp3");
  tristeza1 = loadSound("./Sons/sad.wav");
  salsa = loadSound("./Sons/sound1.mp3");

  piscapisca.playing = true;
  hungry.playing = true;

  piscapisca.looping = true;
  hungry.looping = false;

  tristeza.playing = true;
  tristeza.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  piscapisca.frameDelay = 10;
  hungry.frameDelay = 10;
  tristeza.frameDelay = 10;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  lama = new Chao(200, 690, 600, 20);

  tarzan = new Rope (6, {x: 245, y: 30});

  foodtruck = Bodies.circle (300, 300, 15);
  Matter.Composite.add(tarzan.body, foodtruck);

  fiodental = new Food (tarzan, foodtruck);

  amora = createSprite (250, 575, 100, 100);
  amora.addImage(pedro);
  amora.scale = 0.3;
  amora.addAnimation("piscando", piscapisca);
  amora.addAnimation("comendo", hungry);
  amora.addAnimation("chorando", tristeza);
  amora.changeAnimation("piscando");
  

  edward = createImg ("./Imagens/cut_btn.png");
  edward.position (220, 30);
  edward.size (50, 50);
  edward.mouseClicked(neymar);
}

function draw() 
{
  background(51);
  image(papelDeParede, width/2, height/2, 500, 700);
  Engine.update(engine);
  
  lama.draw();
  tarzan.draw();
  
  if (foodtruck !== null){
    image(magali,foodtruck.position.x, foodtruck.position.y, 75, 75);
  }

  if(coliseu(amora, foodtruck) === true){
    amora.changeAnimation ("comendo");
  }

  if(foodtruck !== null && foodtruck.position.y >= 650){
    amora.changeAnimation("chorando");
    foodtruck = null;
  }
  drawSprites ();
}

function neymar(){
  tarzan.break();
  fiodental.detonaRalfh();
  fiodental = null;
}

function coliseu(predo, malagui){
  if(malagui !== null){
   var regua = dist(predo.position.x, predo.position.y, malagui.position.x, malagui.position.y);
  if (regua <= 80){
    World.remove(engine.world, foodtruck);
    foodtruck = null;
    return true;
  } 
  else{
    return false;
  }
  }
  
}
