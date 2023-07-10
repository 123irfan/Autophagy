const tCellImage=new Image();
tCellImage.src="tCell.png";
class Tcell{
	constructor(x,y,identity){
		this.name='tCell';
		this.x=x;
		this.y=y;
		this.width=54;
		this.height=49;
		this.increase=10;
		this.identity=identity;
		this.activated=false;
		this.tCellImage=tCellImage;
		this.box=new Box(this.x+5,this.y+5,this.x+49,this.y+44);
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
		if(!this.boxRemoved){
			this.box.x1=this.x+5;
			this.box.y1=this.y+5;
			this.box.x2=this.x+49;	
			this.box.y2=this.y+44;
			if(this.box.x1<canvas.width && this.box.x2>0){
				if(!this.boxAdded){
					collisionBoxes.push(this);
					this.boxAdded=true;
				}
			}else this.boxAdded=false;
		}
		if(this.activated){
			if(player.leftTriggered) this.x-=this.increase*Math.cos(45*Math.PI/180);
			else this.x+=this.increase*Math.cos(45*Math.PI/180);
			if(this.identity==1) this.y+=this.increase*Math.sin(45*Math.PI/180);
			else if(this.identity==-1) this.y-=this.increase*Math.sin(45*Math.PI/180);
		}else this.x+=-camera.vx-2;
		if(this.collided){
			this.handleCollision();
			this.collidePartner=[];
		}
	}
	handleCollision(){
		for(let i=0;i<this.collidePartner.length;i++){
			if(!isThere(this.previousPartner,this.collidePartner[i])){
				if(this.collidePartner[i].name=='cytokine'){
					this.collidePartner[i].destroyed=true;
					this.activated=true;
				}else if(this.collidePartner[i].name=='bacteria'){
					this.collidePartner[i].destroyed=true;
					this.destroyed=true;
				}
				this.collidePartner[i].destructionFrame=frames;
			}
		}
		this.previousPartner=this.collidePartner;				
	}
	draw(){
		this.tCellImage.onload=drawImage(this.tCellImage,this.x,this.y,this.width,this.height);
	}
	drawDestruction(){
		if(frames-this.destructionFrame<30){
			drawBubble(this.x+this.width/2,this.y+this.height/2,3,3,Math.random()*10,5);
		}
	}
}
const tCells=[];
function manageTCells(){
	if(frames%200==0){
		tCells.unshift(new Tcell(canvas.width,50,1));
		tCells.unshift(new Tcell(canvas.width,canvas.height-50,-1));
	}
	for(let i=0;i<tCells.length;i++){
		if(!tCells[i].destroyed){
			tCells[i].updateMotion();
			tCells[i].draw();
		}else tCells[i].drawDestruction();
	}
	if(tCells.length>50){
		for(let i=0;i<25;i++){
			tCells.pop(i);
		}
	}
}