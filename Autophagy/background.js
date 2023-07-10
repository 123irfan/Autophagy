const bgImages=[];
bgImages[0]=new Image();
bgImages[0].src="bg1.png";
bgImages[1]=new Image();
bgImages[1].src="bg2.png";
bgImages[2]=new Image();
bgImages[2].src="bg3.png";
class Background{
	constructor(bg,x,y,width,height,velocity){
		this.bg=bg;
		this.width=width;
		this.height=height;
		this.x1=x;
		this.y1=y;
		this.x2=x+width;
		this.velocity=velocity;
	}
	draw(){
		this.bg.onload=drawImage(this.bg,this.x1,this.y1,this.width,this.height);
		this.bg.onload=drawImage(this.bg,this.x2,this.y1,this.width,this.height);
	}
	update(){
		if(player.x>0){
			this.x1-=camera.vx;	
			this.x2-=camera.vx;
			if(this.x1<=0) this.x2=this.x1+this.width;
			if(this.x2<=0) this.x1=this.x2+this.width;
			if(this.x1+this.width>=850) this.x2=this.x1-this.width;
			if(this.x2+this.width>=850) this.x1=this.x2-this.width;
		}	
	}
}
const background1=new Background(bgImages[0],0,0,850,550,camera.vx);
//const background2=new Background(bgImages[1],0,200,1000,300,-2);
//const background3=new Background(bgImages[2],0,400,2000,100,-4);
function manageBackground(){
	background1.update();
	background1.draw();
	/*background2.update();
	background2.draw();
	background3.update();
	background3.draw();*/
}
			
		
		
