const rbcSmallImages=[];
rbcSmallImages[0]=new Image();
rbcSmallImages[0].src="rbcSmallOpen.png";
rbcSmallImages[1]=new Image();
rbcSmallImages[1].src="rbcSmallClose.png";
const rbcBigImages=[];
rbcBigImages[0]=new Image();
rbcBigImages[0].src="rbcBigOpen.png";
rbcBigImages[1]=new Image();
rbcBigImages[1].src="rbcBigClose.png";
class Rbc{
	constructor(width,height,vx,rbcImages,delx1,dely1,delx2,dely2){
		this.name='rbc';
		this.animationFrame=frames;
		this.previousFrame=frames;
		this.width=width;
		this.height=height;
		this.x=800+this.width;
		this.oldX=this.x;
		this.y=Math.random()*(canvas.height-this.height);
		this.vx=vx;
		this.vy=0;
		this.angle=0;
		this.imageNo=0;
		this.rbcImages=rbcImages;
		this.delx1=delx1;
		this.delx2=delx2;
		this.dely1=dely1;
		this.dely2=dely2;
		this.box=new Box(this.x+delx1,this.y+dely1,this.x+delx2,this.y+dely2);
		//this.health=100;
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
		//collision codes
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
		if(this.animationFrame-this.previousFrame<40){
			this.imageNo=0;
		}else if(this.animationFrame-this.previousFrame<45){
			this.imageNo=1;
		}else if(this.animationFrame-this.previousFrame>45){
			this.previousFrame=this.animationFrame;
		}
	}
	draw(){
		this.rbcImages[this.imageNo].onload=drawImage(this.rbcImages[this.imageNo],this.x,this.y,this.width,this.height);
	}
	drawDestruction(){
		if(frames-this.destructionFrame<30){
			drawBubble(this.x+this.width/2,this.y+this.height/2,3,3,Math.random()*10,5);
		}
	}
}
const rbcs=[];
function manageRbcs(){
	if(frames%60==0){
		if(Math.random()>0.5)	rbcs.unshift(new Rbc(71*0.7,43*0.7,4,rbcBigImages,3,3,68,40));
		else	rbcs.unshift(new Rbc(51*0.7,32*0.7,5,rbcSmallImages,3,3,3,3));
	}
	for(let i=0;i<rbcs.length;i++){
		if(!rbcs[i].destroyed){
			rbcs[i].updateMotion();
			rbcs[i].draw();
		}else rbcs[i].drawDestruction();
	}
	for(let i=0;i<rbcs.length;i++){
		if(rbcs[i].x>camera.x+canvas.width || rbcs[i].x<0-rbcs[i].width){
			rbcs.pop(i);
		}
	}
}