let score=0;
const collisionBoxes=[];
function checkCollision(){
	for(let i=0;i<collisionBoxes.length-1;i++){
		for(let j=i+1;j<collisionBoxes.length;j++){
			if(collisionBoxes[i].box.checkBoxIntersect(collisionBoxes[j].box)){
				collisionBoxes[i].collidePartner.push(collisionBoxes[j]);
				collisionBoxes[j].collidePartner.push(collisionBoxes[i]);
				collisionBoxes[i].collided=true;
				collisionBoxes[j].collided=true;
				//console.log(collisionBoxes[i],collisionBoxes[i].collidePartner);
			}
		}
	}
}
function removeCollisionBoxes(){
	for(let i=0;i<collisionBoxes.length;i++){
		if(collisionBoxes[i].box.x2<0 || collisionBoxes[i].box.x1>canvas.width || collisionBoxes[i].destroyed){
			collisionBoxes.splice(i,1);
		}
	}
}	
function isThere(array,object){
	for(let i=0;i<array.length;i++){
		if(array[i]==object) return true;
	}
	return false;
}				
