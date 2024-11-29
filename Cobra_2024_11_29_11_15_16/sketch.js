// tamanho tela
let canvaW = 400;
let canvaH = 400;

// vaariaveis da snake
let xCobra = 50;
let yCobra = 40;
let wCobra = 10;
let hCobra = 10;



// velocidade da movimentaçao 
let velocidadeMovimentacao = 2;

let direcao = "right";

let partes = 1;
let rabo = [];

posicaoXcomida = randomIntFromInterval(11, canvaW - 37);
posicaoYcomida = randomIntFromInterval(11, canvaH - 37);

let colidiu = false;
let comeu = false;

// parede 
// esquerda | direita
let wParED = 10;
let hParED = 400;
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;


// cima | baixo
let wParCB = 400;
let hParCB = 10;
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;

let meusPontos = 0;


let cabeca;
let maca;
let azul;
function preload(){
  cabeca = loadImage("azul.jpg");
  maca = loadImage("cherry.jpg");
  azul = loadImage("images.jpg");
}




function setup() {
  createCanvas(canvaW, canvaH);
}

function draw() {
  background(150);
  rect(xCobra, yCobra, wCobra, hCobra);
  desenhaCobra();
  controleMovimentacao();
  desenhaParede();
  desenharComida();
  comer();
  pegarPosicaoAtual();
  colisaoNasParedes();
  incluirPontos();
}


function desenhaCobra(){
  // /let c =color(105,220,183);
 // fill(c);
 image(cabeca, xCobra, yCobra, wCobra, hCobra);
  
  if (rabo.length > 0){
  for(var i = 0; i < rabo.length; i++){
  image(azul, rabo[i][0], rabo[i][1], wCobra, hCobra);  
  }    
      }
}

function controleMovimentacao(){
  
  if (controleCobra()){
      direcao = controleCobra();
      }
  
  if (direcao == "left"){
    xCobra -= velocidadeMovimentacao;
  }
  
  
  if (direcao == "right"){ 
    xCobra += velocidadeMovimentacao; 
  } 
  
  
  if (direcao == "down"){
    yCobra += velocidadeMovimentacao;
  } 
  
  
  if (direcao == "up"){
    yCobra -= velocidadeMovimentacao;
  } 

}


function controleCobra(){
  if(keyIsDown(LEFT_ARROW)){
    return "left";
}
  
  
  if(keyIsDown(RIGHT_ARROW)){
    return "right";
}
  
  
   if(keyIsDown(DOWN_ARROW)){
    return "down";
}
  
   if(keyIsDown(UP_ARROW)){
    return "up";
}
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * ( max - min + 1 ) + min);
  
}



function desenhaParede(){
  let p = color(34, 87, 65);
  fill(p);
  rect(posXParE, posYParE, wParED,  hParED);
  rect(posXParD, posYParD, wParED,  hParED);
  rect(posXParC, posYParC, wParCB,  hParCB);
  rect(posXParB, posYParB, wParCB,  hParCB);
  
}

function desenharComida(){
  let p = color(113, 9, 11);
  fill(p);
  rect(posicaoXcomida, posicaoYcomida, 12,12 );
}



function colisaoComida() {
  var colisaoComida = collideRectRect( posicaoXcomida, posicaoYcomida, 10, 10, xCobra, yCobra, wCobra, hCobra );
  return colisaoComida;
}

function comer() {
  if (colisaoComida()) {
    posicaoXcomida = randomIntFromInterval(11, canvaW - 37);
    posicaoYcomida = randomIntFromInterval(11, canvaH - 37);
    partes += 1
    meusPontos += 1
    velocidadeMovimentacao += 0.4
  }
}

function pegarPosicaoAtual() {
 
  rabo.push([xCobra, yCobra]);
  if (rabo.length > partes) {
    rabo.shift();
  }
}



function colisaoNasParedes() {
  var colisaoDireita = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParD, posYParD, wParED, hParED );
   var colisaoEquerda = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParE, posYParE, wParED, hParED   );    
   var colisaoCima = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParC, posYParC, wParCB, hParCB   );    
   var colisaoBaixo = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParB, posYParB, wParCB, hParCB   );

  if ( colisaoCima == true || colisaoBaixo == true || colisaoDireita == true || colisaoEquerda == true) {
    xCobra = 200;
    yCobra = 200;
    rabo = [];
    partes = 0;
    
    meusPontos = 0; 
    velocidadeMovimentacao = 2;
  }

}




function incluirPontos(){
 
  stroke(5);
  textAlign(CENTER);
  textSize(20);
  let pontin = color(200,0,0);
  fill(pontin);
  rect(190,10,20,20);
  text(meusPontos, 200,26);
 
}
