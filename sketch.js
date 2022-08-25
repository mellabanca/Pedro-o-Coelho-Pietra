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
var it;
var alerta;
var samurai;
var pontilhada;
var escalada;
var camadegato;
var ligacao;
var cadarco;

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

  var telefoneSemFio = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if(telefoneSemFio){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80, displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }

  
  engine = Engine.create();
  world = engine.world;
  salsa.play();


  piscapisca.frameDelay = 10;
  hungry.frameDelay = 10;
  tristeza.frameDelay = 10;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  lama = new Chao(200, canH, 600, 20);

  tarzan = new Rope (8, {x: 40, y: 30});

  escalada = new Rope (7, {x: 370, y: 40});

  camadegato = new Rope (4, {x: 400, y: 225});


  foodtruck = Bodies.circle (300, 300, 15);
  Matter.Composite.add(tarzan.body, foodtruck);

  fiodental = new Food (tarzan, foodtruck);

  ligacao = new Food (escalada, foodtruck);

  cadarco = new Food (camadegato, foodtruck);


  amora = createSprite (170, canH-120, 100, 100);
  amora.addImage(pedro);
  amora.scale = 0.3;
  amora.addAnimation("piscando", piscapisca);
  amora.addAnimation("comendo", hungry);
  amora.addAnimation("chorando", tristeza);
  amora.changeAnimation("piscando");
  

  edward = createImg ("./Imagens/cut_btn.png");
  edward.position (20, 30);
  edward.size (50, 50);
  edward.mouseClicked(neymar);

  samurai = createImg ("./Imagens/cut_btn.png");
  samurai.position (330, 35);
  samurai.size (50, 50);
  samurai.mouseClicked(messi);

  pontilhada = createImg ("./Imagens/cut_btn.png");
  pontilhada.position (360, 200);
  pontilhada.size (50, 50);
  pontilhada.mouseClicked(cr7);

  alerta = createImg ("./Imagens/mute.png");
  alerta.position (450, 20);
  alerta.size (50, 50);
  alerta.mouseClicked(surdo);
}


function draw() 
{
  background(51);
  image(papelDeParede, width/2, height/2, displayWidth+80, displayHeight);
  Engine.update(engine);
  
  lama.draw();
  tarzan.draw();
  escalada.draw();
  camadegato.draw();
  
  if (foodtruck !== null){
    image(magali,foodtruck.position.x, foodtruck.position.y, 75, 75);
  }

  if(coliseu(amora, foodtruck) === true){
    amora.changeAnimation ("comendo");
    hungry1.play();
  }

  if(foodtruck !== null && foodtruck.position.y >= height-70){
    amora.changeAnimation("chorando");
    foodtruck = null;
    salsa.stop();
    tristeza1.play();
  }
  drawSprites ();
}

function neymar(){
  tarzan.break();
  fiodental.detonaRalfh();
  fiodental = null;
  jokenpo.play();
}

function messi(){
  escalada.break();
  ligacao.detonaRalfh();
  ligacao = null;
  jokenpo.play();
}

function cr7(){
  camadegato.break();
  cadarco.detonaRalfh();
  cadarco = null;
  jokenpo.play();
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

function up(){
  Matter.Body.applyForce(foodtruck, {x: 0, y: 0}, {x: 0.01, y:0});
  aviao.play();
}

function surdo(){
  if (salsa.isPlaying()){
    salsa.stop();
  }
  else{
    salsa.play();
  }
}