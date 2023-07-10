class Cytokine{
	constructor(angle,radius,vr){
		this.name='cytokine';
		this.angle=angle;
		this.radius=radius;
		this.width=5;
		this.height=5;
		this.x=player.x+(player.width/2)+radius*Math.cos(this.angle);
		this.y=player.y+(player.height/2)+radius*Math.sin(this.angle);
		this.color="white";
		this.vx=vr*Math.cos(this.angle);
		this.vy=vr*Math.sin(this.angle);
		this.box=new Box(this.x,this.y,this.x+this.width,this.y+this.height);
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
	update(){
		if(!this.boxRemoved){
			this.box.x1=this.x;
			this.box.y1=this.y;
			this.box.x2=this.x+this.width;	
			this.box.y2=this.y+this.height;
			if(this.box.x1<canvas.width && this.box.x2>0){
				if(!this.boxAdded){
					collisionBoxes.push(this);
					this.boxAdded=true;
				}
			}else this.boxAdded=false;
		}
		this.x+=this.vx-camera.vx;
		this.y+=this.vy;
	}
	draw(){
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.stroke();
	}
}
const cytokines=[];
function manageCytokines(){
	if(player.bombarded && sPressed){
		for(let angle=0;angle<360;angle+=20){
			cytokines.push(new Cytokine(angle,10,5));
		}
		sPressed=false;
	}
	for(let i=0;i<cytokines.length;i++){
		if(!cytokines[i].destroyed){
			cytokines[i].update();
			cytokines[i].draw();
		}
	}
	for(let i=0;i<cytokines.length;i++){
		if(cytokines[i].y<0 || cytokines[i].y>canvas.width){
			cytokines.splice(i,1);
		}
	}
}
	