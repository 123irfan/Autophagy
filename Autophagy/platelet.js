const plateImage=new Image();
plateImage.src="platelate.png";
class Plate{
	constructor(){
		this.x=canvas.width;
		this.y=Math.random()*canvas.height;
		this.vx=-3;
		this.vy=0;
		this.angle=0;
		this.image=plateImage;
	}
	update(){
		this.angle+=5;
		if(this.angle>360) this.angle=0;
		this.x+=this.vx;
		this.y+=Math.sin(this.angle*Math.PI/180);
	}
	draw(){
		this.image.onload=drawImage(this.image,this.x,this.y,this.width,this.height);
	}
}
const plates=[];
function managePlates(){
	if(frames%50==0){
		plates.unshift(new Plate());
	}
	for(let i=0;i<plates.length;i++){
		plates[i].update();
		plates[i].draw();
	}
	if(plates.length<50){
		for(let i=0;i<plates.length;i++){
			plates.pop(i);
		}
	}
}