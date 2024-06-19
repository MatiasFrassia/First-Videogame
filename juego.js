let contexto = document.getElementById("lienzoJuego").getContext("2d");
contexto.canvas.width = 300;
contexto.canvas.height = 530;
let score = 0;
const FPS = 60;
const GRAVEDAD = 1.5;
let personaje = {
    x:50, //La X es la esquina superior izquierda del personaje
    y : 150,
    w: 35,
    h:26
}
let tuberias = new Array();
tuberias[0] = {
    x: contexto.canvas.width,
    y: 0
}
//VARIABLE AUDIOS
let punto = new Audio();
punto.src = "audio/punto.mp3"

//VARIABLE IMAGEN
let bird = new Image();
bird.src = "imagenes/bird.png";

let background = new Image();
background.src = "imagenes/background.png";

let tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

let tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png";

let suelo = new Image();
suelo.src = "imagenes/suelo.png";


//CONTROL
function keyDown(){
    personaje.y -= 30;//El personaje sube 25px
}

 
setInterval(loop, 1000/FPS);
function loop(){
    contexto.clearRect(0,0,300,700)//Limpia el rectangulo
     //FONDO
     contexto.drawImage(background, 0, 0);
     contexto.drawImage(suelo,0,contexto.canvas.height - suelo.height);//Altura del canvas - altura del image suelo
    //PERSONAJE
    contexto.fillStyle = "rgba(100,0,0,1)";//Pinta el fondo
    contexto.fillRect(personaje.x, personaje.y, personaje.w, personaje.h);//Pinta el fondo de un rectangulo
   
    contexto.drawImage(bird, personaje.x, personaje.y);
    
    //TUBERIAS
    for(let i = 0; i < tuberias.length; i++){
        let desfasaje = tuberiaNorte.height + 80;
         contexto.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y);
         contexto.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + desfasaje);
         tuberias[i].x--;

         if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0;
         }

         if(tuberias[i].x == 100){//Al llegar a 130px del canvas se genera una nueva tuberia
            tuberias.push({
                x: contexto.canvas.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            });
            score++;
            punto.play();
         }
         //COLISIONES
         if(personaje.x + bird.width >= tuberias[i].x &&
             personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height || 
            personaje.y + bird.height >= tuberias[i].y + desfasaje) ||
            personaje.y + bird.height >= contexto.canvas.height - suelo.height){
                location.reload();

         }
         
    }

    personaje.y += GRAVEDAD;//Hace caer el personaje
    contexto.fillstyle = "rgba(0,0,0,1)";
    contexto.font = "25px Arial";
    contexto.fillText("Score: " + score, 10, contexto.canvas.height - 40);
}

window.addEventListener("click", keyDown)//Cada vez que s epresione cualquier tecla el personaje sube 25px