const canvas=document.getElementById("ourcanvas");
canvas.width=850;
canvas.height=550;
const ctx=canvas.getContext("2d");

const rbcScore=-2;
const virusScore=1;
const bacteria1Score=3;
const bacteria2Score=2;
const deadCellScore=2;
const lifeBarImage=new Image();
lifeBarImage.src='lifeBar.png';
const gameOverImage=new Image();
gameOverImage.src="gameOver.png";


let gameOver=false;
let escapePressed=false;
let mousePosition=[];
let frames=0;
//let speedOfGame=6;

let sPressed=false;
let spacePressed=false;
let enterPressed=false;
let leftPressed=false;
let rightPressed=false;
let upPressed=false;
let downPressed=false;

let enterCount=0;

function drawScore(){
	ctx.font = "20px Arial";
	ctx.fillStyle='white';
	ctx.fillText("Score: "+player.score,0,15);
}
function drawLifeBar(){
	lifeBarImage.onload=drawImage(lifeBarImage,315,0,220,15);
	ctx.fillStyle='white';
	ctx.fillRect(315+8,5,(player.health/10000)*209,5);
}
function gameLoop(){
		if(escapePressed){
			ctx.font = "60px Comic Sans MS";
			ctx.fillStyle='white';
			ctx.fillText("PAUSED",310,200);
		}else if(gameOver){
			ctx.clearRect(0,0,850,550);
			gameOverImage.onload=drawImage(gameOverImage,0,0,canvas.width,canvas.height);
			ctx.font = "60px Comic Sans MS";
			ctx.fillStyle='white';
			ctx.fillText("Score: "+player.score,250,200);
		}
		else{
			ctx.clearRect(0,0,850,550);
			camera.update();
			manageBackground();
			manageRbcs();
			manageBacterias();
			manageViruses();
			managePlayer();
			manageCytokines();
			manageDeadCells();
			manageTCells();
			drawScore();
			drawLifeBar();
			removeCollisionBoxes();
			checkCollision();
			frames++;
		}
	requestAnimationFrame(gameLoop);
}
gameLoop();

function getMousePosition(canvas,e){
	let rect=canvas.getBoundingClientRect();
	let scaleX=canvas.width/rect.width;
	let scaleY=canvas.height/rect.height;
	let mouseX=(e.clientX-rect.left)*scaleX;
	let mouseY=(e.clientY-rect.top)*scaleY;
	return [mouseX,mouseY];
}
window.addEventListener("keydown",function(e){
	if(e.code==='Escape'){
		escapePressed=!escapePressed;
	}
});
window.addEventListener("keydown",function(e){
	if(e.code==='KeyS'){
		sPressed=true;
	}
});
window.addEventListener("keydown", function(e) {
  if (e.code === "ArrowLeft") {
    leftPressed = true;
  } else if (e.code === "ArrowRight") {
    rightPressed = true;
  } else if (e.code === "ArrowUp") {
    upPressed = true;
  }else if(e.code ==="ArrowDown"){
    downPressed=true;
  }
});

window.addEventListener("keyup", function(e) {
  if (e.code === "ArrowLeft") {
    leftPressed = false;
  } else if (e.code === "ArrowRight") {
    rightPressed = false;
  } else if (e.code === "ArrowUp") {
    upPressed = false;
  }else if(e.code==="ArrowDown"){
    downPressed=false;
  }
});

window.addEventListener("keyup",function(e){
	if(e.code==='KeyS'){
		sPressed=false;
	}
});
window.addEventListener("keydown",function(e){
	if(e.code==='Space'){
		spacePressed=true;
	}
});
window.addEventListener("keyup",function(e){
	if(e.code==='Enter'){
		enterPressed=false;
	}
});
window.addEventListener("keydown",function(e){
	if(e.code==='Enter'){
		enterPressed=true;
	}
});
window.addEventListener("keyup",function(e){
	if(e.code==='Space'){
		spacePressed=false;
	}
});
canvas.addEventListener("click",function(e){
	mouseClicked=true;
});
canvas.addEventListener("mousemove",function(e){
	mousePosition=getMousePosition(canvas,e);
});

