const deadCellImage=new Image();
deadCellImage.src="DeadCell.png";
class DeadCell{
	constructor(x,y){
		this.name='deadCell';
		this.x=x;
		this.y=y;
		this.width=91;
		this.height=45;
		this.deadCellImage=deadCellImage;
		this.box=new Box(this.x+5,this.y+10,this.x+40,this.y+81);
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
		if(!this.boxRemoved){
			this.box.x1=this.x+5;
			this.box.y1=this.y+10;
			this.box.x2=this.x+40;	
			this.box.y2=this.y+81;
			if(this.box.x1<canvas.width && this.box.x2>0){
				if(!this.boxAdded){
					collisionBoxes.push(this);
					this.boxAdded=true;
				}
			}else this.boxAdded=false;
		}
		this.x-=camera.vx-3;
	}
	draw(){
		this.deadCellImage.onload=drawImage(this.deadCellImage,this.x,this.y,this.width,this.height);
	}
	drawDestruction(){
		if(frames-this.destructionFrame<30){
			drawBubble(this.x+this.width/2,this.y+this.height/2,3,3,Math.random()*10,5);
		}
	}
}
const deadCells=[];
function manageDeadCells(){
	if(frames%300==0){
		if(Math.random()<0.5) deadCells.unshift(new DeadCell(canvas.width,60));
		else deadCells.unshift(new DeadCell(canvas.width,canvas.height-60));
	}
	for(let i=0;i<deadCells.length;i++){
		if(!deadCells[i].destroyed){
			deadCells[i].updateMotion();
			deadCells[i].draw();
		}else deadCells[i].drawDestruction();
	}
	if(deadCells.length>50){
		for(let i=0;i<25;i++){
			deadCells.pop(i);
		}
	}
}