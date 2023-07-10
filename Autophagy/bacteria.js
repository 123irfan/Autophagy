const greenBacteriaImages=[];
greenBacteriaImages[0]=new Image();
greenBacteriaImages[0].src="greenBacteria1.png";
greenBacteriaImages[1]=new Image();
greenBacteriaImages[1].src="greenBacteria2.png";
const yellowBacteriaImages=[];
yellowBacteriaImages[0]=new Image();
yellowBacteriaImages[0].src="yellowBacteria1.png";
yellowBacteriaImages[1]=new Image();
yellowBacteriaImages[1].src="yellowBacteria2.png";
class Bacteria{
	constructor(width,height,vx,identity,bacteriaImages,delx1,dely1,delx2,dely2){
		this.name='bacteria';
		this.animationFrame=frames;
		this.previousFrame=frames;
		this.identity=identity;
		this.width=width;
		this.height=height;
		this.x=canvas.width+this.width;
		this.oldX=this.x;
		this.y=Math.random()*(canvas.height-this.height);
		this.vx=vx;
		this.vy=0;
		this.angle=0;
		this.imageNo=0;
		this.bacteriaImages=bacteriaImages;
		this.delx1=delx1;
		this.delx2=delx2;
		this.dely1=dely1;
		this.dely2=dely2;
		this.box=new Box(this.x+delx1,this.y+dely1,this.x+delx2,this.y+dely2);
		this.health=100;
		this.previousPartner=[];
		this.collidePartner=[];
		this.collided=false;
		this.boxAdded=false;
		this.boxRemoved=false;
		this.health=100;
		this.destroyed=false;
		this.destructionFrame=0;
	}
	updateMotion(){
		this.oldX=this.x;
		this.animationFrame+=1;
		if(!this.boxRemoved){
			this.box.x1=this.x+this.delx1;
			this.box.y1=this.y+this.dely1;
			this.box.x2=this.x+this.delx2;	
			this.box.y2=this.y+this.dely2;
			if(this.box.x1<canvas.width && this.box.x2>0){
				if(!this.boxAdded){
					collisionBoxes.push(this);
					this.boxAdded=true;
				}
			}else this.boxAdded=false;
		}
		this.x-=this.vx-camera.vx;
		if(frames%2==0) this.angle+=5;
		if(this.angle>360) this.angle=0;
		this.y+=Math.sin(this.angle*Math.PI/180);
		this.toggleAnimation();
	}
	toggleAnimation(){
		if(this.animationFrame-this.previousFrame<20){
			this.imageNo=0;
		}else if(this.animationFrame-this.previousFrame<40){
			this.imageNo=1;
		}else if(this.animationFrame-this.previousFrame>40){
			this.previousFrame=this.animationFrame;
		}
	}
	draw(){
		this.bacteriaImages[this.imageNo].onload=drawImage(this.bacteriaImages[this.imageNo],this.x,this.y,this.width,this.height);
	}
	drawDestruction(){
		if(frames-this.destructionFrame<30){
			drawBubble(this.x+this.width/2,this.y+this.height/2,3,3,Math.random()*10,5);
		}
	}
}
const bacterias=[];
function manageBacterias(){
	if(frames%100==0){
		if(Math.random()>0.5)	bacterias.unshift(new Bacteria(74*0.7,81*0.7,2,1,greenBacteriaImages,21,24,43,71));
		else			bacterias.unshift(new Bacteria(46*0.7,90*0.7,3,2,yellowBacteriaImages,13,19,31,70));
	}
	for(let i=0;i<bacterias.length;i++){
		if(!bacterias[i].destroyed){
			bacterias[i].updateMotion();
			bacterias[i].draw();
		}else bacterias[i].drawDestruction();
	}
	if(bacterias.length>100){
		for(let i=0;i<50;i++){
			bacterias.pop(i);
		}
	}
}