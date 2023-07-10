function drawImage(image,x,y,width,height){
	ctx.imageSmoothingEnabled=false;
	ctx.drawImage(image,x,y,width,height);
}
function drawClippedImage(image,sx,sy,sw,sh,x,y,width,height){
	ctx.imageSmoothingEnabled=false;
	ctx.drawImage(image,sx,sy,sw,sh,x,y,width,height);
}
const moveR=[];
moveR[0]=new Image();
moveR[0].src="moveRight1.png";
moveR[1]=new Image();
moveR[1].src="moveRight2.png";
const moveL=[];
moveL[0]=new Image();
moveL[0].src="moveLeft1.png";
moveL[1]=new Image();
moveL[1].src="moveLeft2.png";

const phagoR=[];
phagoR[0]=new Image();
phagoR[0].src="phagoRight1.png";
phagoR[1]=new Image();
phagoR[1].src="phagoRight2.png";
phagoR[2]=new Image();
phagoR[2].src="phagoRight3.png";
phagoR[3]=new Image();
phagoR[3].src="phagoRight4.png";
phagoR[4]=new Image();
phagoR[4].src="phagoRight5.png";

const phagoL=[];
phagoL[0]=new Image();
phagoL[0].src="phagoLeft1.png";
phagoL[1]=new Image();
phagoL[1].src="phagoLeft2.png";
phagoL[2]=new Image();
phagoL[2].src="phagoLeft3.png";
phagoL[3]=new Image();
phagoL[3].src="phagoLeft4.png";
phagoL[4]=new Image();
phagoL[4].src="phagoLeft5.png"


const cytoR=[];
cytoR[0]=new Image();
cytoR[0].src="cytoRight1.png";
cytoR[1]=new Image();
cytoR[1].src="cytoRight2.png";
const cytoL=[];
cytoL[0]=new Image();
cytoL[0].src="cytoLeft1.png";
cytoL[1]=new Image();
cytoL[1].src="cytoLeft2.png";

const wastedR=new Image();
wastedR.src="wasted1.png";
const wastedL=new Image();
wastedL.src="wasted2.png";

class Player{
	constructor(){
		this.name="monocyte";
		this.x=200;
		this.oldX=200;
		this.y=300;
		this.width=132;
		this.height=148;
		this.vx=5;
		this.vy=-2;
		this.fallingSpeed=2;
		this.imageMovingNo=0;
		this.imagePhagoNo=0;
		this.imageCytoNo=0;
		this.animationMovingFrame=0;
		this.previousMovingFrame=0;
		this.animationCytoFrame=0;
		this.previousCytoFrame=0;
		this.animationPhagoOpenFrame=0;
		this.previousPhagoOpenFrame=0;
		this.animationPhagoCloseFrame=0;
		this.previousPhagoCloseFrame=0;
		this.rightMoveImages=moveR;
		this.leftMoveImages=moveL;
		this.rightPhagoImages=phagoR;
		this.leftPhagoImages=phagoL;
		this.rightCytoImages=cytoR;
		this.leftCytoImages=cytoL;
		this.bombarded=false;
		this.cytoImageCount=2;
		this.leftTriggered=false;
		this.rightTriggered=true;
		this.upTriggered=false;
		this.downTriggered=false;
		this.closeTrigger=false;
		this.box=new Box(this.x+50,this.y+29,this.x+88,this.y+110);
		this.health=100;
		this.previousPartner=[];
		this.collidePartner=[];
		this.collided=false;
		this.boxAdded=false;
		this.boxRemoved=false;
		this.health=10000;         //health as seconds 
		this.destroyed=false;
		this.destructionFrame=0;
		this.score=0;
	}
	toggleMovingAnimation(condition){
		if(this.animationMovingFrame-this.previousMovingFrame<10){
			this.imageMovingNo=0;
		}else if(this.animationMovingFrame-this.previousMovingFrame<20){
			this.imageMovingNo=1;
		}else if(this.animationMovingFrame-this.previousMovingFrame>20){
			this.animationMovingFrame=0;
		}
		if(!condition) this.imageMovingNo=0;
	}
	toggleCytoAnimation(condition){
		if(this.animationCytoFrame-this.previousCytoFrame<10){
			this.imageCytoNo=0;
		}else if(this.animationCytoFrame-this.previousCytoFrame<20){
			this.imageCytoNo=1;
		}else if(this.animationCytoFrame-this.previousCytoFrame>20){
			this.animationCytoFrame=0;
			this.bombarded=false;
		}
		if(!condition) this.imageCytoNo=0;
	}
	togglePhagoAnimation(condition){
		if(this.animationPhagoOpenFrame-this.previousPhagoOpenFrame<5){
			this.imagePhagoNo=0;
		}else if(this.animationPhagoOpenFrame-this.previousPhagoOpenFrame<10){
			this.imagePhagoNo=1;
		}else if(this.animationPhagoOpenFrame-this.previousPhagoOpenFrame>10){
			this.imagePhagoNo=2;
			if(this.closeTrigger){
				this.animationPhagoCloseFrame+=1;
				if(this.animationPhagoCloseFrame-this.previousPhagoCloseFrame<5){
					this.imagePhagoNo=3;
				}else if(this.animationPhagoCloseFrame-this.previousPhagoCloseFrame<10){
					this.imagePhagoNo=4;
				}else if(this.animationPhagoCloseFrame-this.previousPhagoCloseFrame>10){
					this.animationPhagoCloseFrame=0;
					this.closeTrigger=false;
				}
				if(!condition) this.imagePhagoNo=3;
				this.animationPhagoOpenFrame=0;
			}
			if(!spacePressed) this.animationPhagoOpenFrame=0;
		}
		if(!condition) this.imagePhagoNo=0;
	}
	updateMotion(){
		this.health-=5;
		this.oldX=this.x;
		this.animationMovingFrame+=1;
		if(sPressed) this.bombarded=true;
		//collision codes
		if(!this.boxRemoved){
			this.box.x1=this.x+45;
			this.box.y1=this.y+27;
			this.box.x2=this.x+93;	
			this.box.y2=this.y+123;
			if(this.box.x1<canvas.width && this.box.x2>0){
				if(!this.boxAdded){
					collisionBoxes.push(this);
					this.boxAdded=true;
				}
			}else this.boxAdded=false;
		}
      		if(player.y<0) player.y=0;
		if(player.y>canvas.height-player.height) player.y=canvas.height-player.height;
		if(player.x<0) player.x=0;
		if(player.x>canvas.width-player.width) player.x=canvas.width-player.width;
		if(camera.cameraXactivated) this.vx=0;
		else this.vx=3;
		if(rightPressed && leftPressed){
			this.x+=0;
			this.handleUpDown();
			if(this.bombarded){
				this.animationCytoFrame+=1;
				this.toggleCytoAnimation(rightPressed);
			}
			else if(spacePressed){
				this.animationPhagoOpenFrame+=1;
				this.togglePhagoAnimation(rightPressed);
				
			}
			else	this.toggleMovingAnimation(rightPressed);
		}
		else if(rightPressed){
			this.rightTriggered=true;
			this.leftTriggered=false;
			this.x+=this.vx;
			this.handleUpDown();
			if(this.bombarded){
				this.animationCytoFrame+=1;
				this.toggleCytoAnimation(rightPressed);
			}
			else if(spacePressed){
				this.animationPhagoOpenFrame+=1;
				this.togglePhagoAnimation(rightPressed);
			}
			else	this.toggleMovingAnimation(rightPressed);
		}else if(leftPressed){
			this.leftTriggered=true;
			this.rightTriggered=false;
			this.x-=this.vx;
			this.handleUpDown();
			if(this.bombarded){
				this.animationCytoFrame+=1;
				this.toggleCytoAnimation(leftPressed);
			}
			else if(spacePressed){
				this.animationPhagoOpenFrame+=1;
				this.togglePhagoAnimation(leftPressed);
			}
			else	this.toggleMovingAnimation(leftPressed);
		}else if(!rightPressed && !leftPressed){
			//this.imageMovingNo=0;
			this.handleUpDown();
			if(this.bombarded){
				this.animationCytoFrame+=1;
				this.toggleCytoAnimation(rightPressed);
			}
			else if(spacePressed){
				this.animationPhagoOpenFrame+=1;
				this.togglePhagoAnimation(rightPressed);
				//this.imagePhagoOpenNo=2;
			}
			else	this.toggleMovingAnimation(rightPressed);
			this.x+=0;
		}
		if(this.collided){
			this.closeTrigger=true;
			this.handleCollision();
			this.collidePartner=[];
		}
		
	}
	handleUpDown(){
		if(upPressed && downPressed){
			this.y+=0;
		}
		else if(upPressed){
			this.upTriggered=true;
			this.downTriggered=false;
			this.y+=this.vy;
		}else if(downPressed){
			this.downTriggered=true;
			this.upTriggered=false;
			this.y-=this.vy;
		}
	}
	draw(){
		if(this.leftTriggered){
			if(this.bombarded){
				this.leftCytoImages[this.imageCytoNo].onload=drawImage(this.leftCytoImages[this.imageCytoNo],this.x,this.y,this.width,this.height);	
			}else if(spacePressed){
				this.leftPhagoImages[this.imagePhagoNo].onload=drawImage(this.leftPhagoImages[this.imagePhagoNo],this.x,this.y,this.width,this.height);
			}
			else if(!this.bombarded && !spacePressed){
				this.leftMoveImages[this.imageMovingNo].onload=drawImage(this.leftMoveImages[this.imageMovingNo],this.x,this.y,this.width,this.height);
			}
		}else if(this.rightTriggered){
			if(this.bombarded){
				this.rightCytoImages[this.imageCytoNo].onload=drawImage(this.rightCytoImages[this.imageCytoNo],this.x,this.y,this.width,this.height);
			}
			else if(spacePressed){
				this.rightPhagoImages[this.imagePhagoNo].onload=drawImage(this.rightPhagoImages[this.imagePhagoNo],this.x,this.y,this.width,this.height);
			}else if(!this.bombarded && !spacePressed){
				this.rightMoveImages[this.imageMovingNo].onload=drawImage(this.rightMoveImages[this.imageMovingNo],this.x,this.y,this.width,this.height);
			}
		}
	}
	updateHealth(){
		if(this.health<=0){
			this.destroyed=true;
			this.destructionFrame=frames;
		}
	}
	handleCollision(){
		for(let i=0;i<this.collidePartner.length;i++){
			if(!isThere(this.previousPartner,this.collidePartner[i]) && spacePressed){
				if(this.collidePartner[i].name=='rbc'){
					if(this.collidePartner[i].dely2==40){
						this.score+=rbcScore;
						this.collidePartner[i].destroyed=true;
					}
				}else if(this.collidePartner[i].name=='bacteria'){
					this.collidePartner[i].destroyed=true;
					if(this.collidePartner[i].identity==1) this.score+=bacteria1Score;
					else this.score+=bacteria2Score;
				}else if(this.collidePartner[i].name=='deadCell'){
					this.collidePartner[i].destroyed=true;
					this.score+=deadCellScore;
				}else if(this.collidePartner[i].name=='virus'){
					this.collidePartner[i].destroyed=true;
					this.score+=virusScore;
				}
				this.collidePartner[i].destructionFrame=frames;
				if(this.health<9900) this.health+=20;
				if(this.score<0) this.score=0;		
			}
		}
		this.previousPartner=this.collidePartner;
	}
	drawDeath(){
		if(frames-this.destructionFrame<50){
			if(this.rightTriggered) drawImage(wastedR,this.x,this.y,this.width,this.height);
			else drawImage(wastedL,this.x,this.y,this.width,this.height);
		}
	}	
}
const player=new Player();
function managePlayer(){
	if(!player.destroyed){
		player.updateMotion();
		player.updateHealth();
		player.draw();
	}
	else{
		gameOver=true;
		player.drawDeath();
	}
}
		
		