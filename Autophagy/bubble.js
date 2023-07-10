
class Sphere{
	constructor(x,y,vx,vy,colorString,radius){
		this.x=x;
		this.y=y;
		this.radius=radius;
		this.vx=vx;
		this.vy=vy;
		this.color=colorString;
	}
	drawSphere(){
		ctx.beginPath();
		ctx.fillStyle=this.color;
		//ctx.lineWidth=0;
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
		ctx.fill();
		//ctx.stroke();
	}
	update(){
		this.x+=1;
		this.y-=1;
	}
}
const bubbleArray=[];		
function drawBubble(x,y,vx,vy,radius,bubbleRate){
	if(frames%bubbleRate==0){
		bubbleArray.unshift(new Sphere(x,y,vx,vy,'white',radius));
	}
	for(let i=0;i<bubbleArray.length;i++){
		bubbleArray[i].update();
		bubbleArray[i].drawSphere();
	}
	if(bubbleArray.length>10){
		for(let i=0;i<5;i++){
			bubbleArray.pop(bubbleArray[i]);
		}
	}
}

		