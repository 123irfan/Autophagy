const virusImage1=new Image();
virusImage1.src="redVirus.png";
const virusImage2=new Image();
virusImage2.src="yellowVirus.png";
const virusImage3=new Image();
virusImage3.src="blueVirus.png";
class Virus{
	constructor(width,height,vx,virusImage,delx1,dely1,delx2,dely2){
		this.name='virus';
		this.animationFrame=frames;
		this.previousFrame=frames;
		this.width=width;
		this.height=height;
		this.x=canvas.width+this.width;
		this.oldX=this.x;
		this.y=Math.random()*(canvas.height-this.height);
		this.vx=vx;
		this.vy=0;
		this.angle=0;
		this.imageNo=0;
		this.virusImage=virusImage;
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
		this.x-=(this.vx-camera.vx);
		if(frames%2==0) this.angle+=2;
		if(this.angle>360) this.angle=0;
		this.y+=Math.sin(this.angle*Math.PI/180);
	}
	draw(){
		this.virusImage.onload=drawImage(this.virusImage,this.x,this.y,this.width,this.height);
	}
	drawDestruction(){
		if(frames-this.destructionFrame<30){
			drawBubble(this.x+this.width/2,this.y+this.height/2,3,3,Math.random()*10,5);
		}
	}
}
const viruses=[];
function manageViruses(){
	if(frames%80==0){
		if(Math.random()>0.6)	viruses.unshift(new Virus(49*0.7,49*0.7,3,virusImage1,5,5,44,44));
		else if(Math.random()>0.3)	viruses.unshift(new Virus(43*0.7,43*0.7,4,virusImage2,4,4,39,39));
		else			viruses.unshift(new Virus(37*0.7,37*0.7,5,virusImage3,3,3,31,31));
	}
	for(let i=0;i<viruses.length;i++){
		if(!viruses[i].destroyed){
			viruses[i].updateMotion();
			viruses[i].draw();
		}else viruses[i].drawDestruction();
	}
	if(viruses.length>100){
		for(let i=0;i<50;i++){
			viruses.pop(i);
		}
	}
}