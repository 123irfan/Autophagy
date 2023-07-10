function drawImage(image,x,y,width,height){
	ctx.imageSmoothingEnabled=false;
	ctx.drawImage(image,x,y,width,height);
}
function drawClippedImage(image,sx,sy,sw,sh,x,y,width,height){
	ctx.imageSmoothingEnabled=false;
	ctx.drawImage(image,sx,sy,sw,sh,x,y,width,height);
}
const playerImagesR=[];
playerImagesR[0]=new Image();
playerImagesR[0].src="walking0.png";
playerImagesR[1]=new Image();
playerImagesR[1].src="walking1.png";
playerImagesR[2]=new Image();
playerImagesR[2].src="walking2.png";
const playerImagesL=[];
playerImagesL[0]=new Image();
playerImagesL[0].src="walking3.png";
playerImagesL[1]=new Image();
playerImagesL[1].src="walking4.png";
playerImagesL[2]=new Image();
playerImagesL[2].src="walking5.png";
const firingImagesR=[];
firingImagesR[0]=new Image();
firingImagesR[0].src="firing0.png";
firingImagesR[1]=new Image();
firingImagesR[1].src="firing1.png";
firingImagesR[2]=new Image();
firingImagesR[2].src="firing2.png";
const firingImagesL=[];
firingImagesL[0]=new Image();
firingImagesL[0].src="firing3.png";
firingImagesL[1]=new Image();
firingImagesL[1].src="firing4.png";
firingImagesL[2]=new Image();
firingImagesL[2].src="firing5.png"
class Player{
	constructor(){
		this.name="player";
		this.x=200;
		this.y=300;
		this.width=70;
		this.height=100;
		this.vx=6;
		this.vy=-3;
		this.imageNo=0;
		this.rightImages=playerImagesR;
		this.leftImages=playerImagesL;
		this.firingRightImages=firingImagesR;
		this.firingLeftImages=firingImagesL;
		this.leftTriggered=false;
		this.rightTriggered=true;
		this.jumped=false;
		this.gunTriggered=false;
		this.jumpSpeed=2.5;
		this.fallingSpeed=0.1;
		this.platform=300;
		this.box=new Box(this.x+10,this.y+5,this.x+60,this.y+100);
		this.previousPartner=[];
		this.collidePartner=[];
		this.collided=false;
		this.boxAdded=false;
		this.boxRemoved=false;
		this.health=100;
		this.destroyed=false;
		this.destructionFrame=0;
		this.light=new Light(this,60,300);
		this.playerBullets=[];
	}
	updateMotion(){
		this.light.update(this);
		this.platform=getPlatform(this,platformsLevel1,camera.x,camera.y);
		//collision codes
		if(!this.boxRemoved){
			this.box.x1=this.x+10;
			this.box.y1=this.y+5;
			this.box.x2=this.x+60;	
			this.box.y2=this.y+100;
			if(this.box.x1<800 && this.box.x2>0){
				if(!this.boxAdded){
					collisionBoxes.push(this);
					this.boxAdded=true;
				}
			}else this.boxAdded=false;
		}
		
		if(upPressed){
			this.jumped=true;
		}else this.jump=false;
		if(player.x<0) player.x=0;                //player leftmost limit
		if(player.x>800-70) player.x=800-70;   //player rightmost limit
		if(camera.cameraXactivated) this.vx=0;  //move with cameraspeed
		else this.vx=6;			   //move with ownspeed
		if(camera.cameraYactivated) this.vy=0;
		if(this.jumped){
			this.fallingSpeed+=0.3;
			this.vy+=this.jumpSpeed-this.fallingSpeed;
		}else this.vy=-3;
		if(rightPressed && leftPressed){
			this.x+=0;
		}
		else if(rightPressed){
			this.rightTriggered=true;
			this.leftTriggered=false;
			this.x+=this.vx;
			if(frames%3==0)	this.toggleAnimation(rightPressed);
		}else if(leftPressed){
			this.leftTriggered=true;
			this.rightTriggered=false;
			this.x-=this.vx;
			if(frames%3==0)	this.toggleAnimation(leftPressed);
		}else if(!rightPressed && !leftPressed){
			this.imageNo=0;
			this.x+=0;
		}
		this.y-=this.vy;
		if(this.y>=this.platform){
			this.vy=0;
			this.y=this.platform;
			this.fallingSpeed=0;
			this.jumped=false;
		}
		if(this.collided){
			this.handleCollision();
			this.collidePartner=[];
		}
	}
	toggleAnimation(condition){
		if(this.imageNo<2){
			this.imageNo+=1;
		}else{
			this.imageNo=0;
		}
		if(!condition) this.imageNo=0;
	}
	updateFiring(){
		if(sPressed){
			this.firingAnimation();
			if(player.leftTriggered){
				loadBullets(player,-1,this.playerBullets,true);
			}else if(player.rightTriggered){
				loadBullets(player,1,this.playerBullets,true);
			}
		}
	}
	firingAnimation(){
		for(let i=0;i<3;i++){
			if(this.leftTriggered){
				this.firingLeftImages[i].onload=drawImage(this.firingLeftImages[i],this.x,this.y,this.width,this.height);
			}else if(this.rightTriggered){
				this.firingRightImages[i].onload=drawImage(this.firingRightImages[i],this.x,this.y,this.width,this.height);
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
			if(!isThere(this.previousPartner,this.collidePartner[i])){
				if(this.collidePartner[i].name=='bullet'){
					this.health-=bulletLoss;
				}else if(this.collidePartner[i].name=='fireBall'){
					this.health-=fireBallLoss;
				}else if(this.collidePartner[i].name=='ghost'){
					this.health-=ghostLoss;
				}else if(this.collidePartner[i].name=='tile'){
					if(!(this.box.y2>=this.collidePartner[i].box.y1 && this.box.y2<this.collidePartner[i].box.y2)){
						if(this.box.x2>=this.collidePartner[i].box.x1 && this.box.x2<this.collidePartner[i].box.x2){
							this.x=this.collidePartner[i].x-this.width;
						}else if(this.collidePartner[i].box.x2>=this.box.x1 && this.collidePartner[i].box.x2<this.box.x2){
							this.x=this.collidePartner[i].x+this.collidePartner[i].width;
						}
					}	
				}
			}
		}
		this.previousPartner=this.collidePartner;
		//this.collidePartner=[];
	}		
	draw(){
		if(this.leftTriggered){
			if(!sPressed){
				this.leftImages[this.imageNo].onload=drawImage(this.leftImages[this.imageNo],this.x,this.y,this.width,this.height);
			}else{
				this.firingLeftImages[2].onload=drawImage(this.firingLeftImages[2],this.x,this.y,this.width,this.height);
			}
			fireBullets(this.playerBullets);
		}else if(this.rightTriggered){
			if(!sPressed){
				this.rightImages[this.imageNo].onload=drawImage(this.rightImages[this.imageNo],this.x,this.y,this.width,this.height);
			}else{
				this.firingRightImages[2].onload=drawImage(this.firingRightImages[2],this.x,this.y,this.width,this.height);
			}
			fireBullets(this.playerBullets);
		}
		this.light.draw();
	}
}
const player=new Player();
function handlePlayer(){
	player.updateHealth();
	player.updateMotion();
	//if(frames%500==0) console.log(player.health);
	if(sPressed){
		player.updateFiring();
	}
	player.draw();
}
				
