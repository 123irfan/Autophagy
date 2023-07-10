//const tileLeftX=48;//leftmost tile at the tilearray
//const tileRightX=78;//rightmost tile at the tilearray
//const tileTopY=0;//topmost tile at the tileArray
//const tileBottomY=177;//bottommost tile at the array



class Camera{
	constructor(){
		this.x=0;
		this.y=0;
		this.vx=0;
		this.vy=0;
		this.gameStart=0;
		this.gameEnd=10000;
		this.cameraXactivated=false;
		this.cameraYactivated=false;
	}
	update(){
		if(player.x>=canvas.width/2-player.width && rightPressed && this.gameEnd>=canvas.width){
			this.vx=3;
			this.cameraXactivated=true;
			
		}/*else if(player.x<=200+player.width && leftPressed && this.gameStart<=0){
			this.vx=-3;
			this.cameraXactivated=true;
		}*/else{
			this.vx=0;
			this.cameraXactivated=false;
		}
		/*if(player.y>=400 && tiles[tileBottomY].y>400){
			this.vy=3;
			this.cameraYactivated=true;
		}else if(player.y<=100 && tiles[tileTopY].y<0){
			this.vy=-3;
			this.cameraYactivated=true;
		}else{
			this.vy=0;
			this.cameraYactivated=false;
		}*/
		this.y+=this.vy;
		this.x+=this.vx;
		this.gameStart-=this.vx;
		this.gameEnd-=this.vx;
	}
}
const camera=new Camera();
