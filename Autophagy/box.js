
class Box{
	constructor(x1,y1,x2,y2){
		this.x1=x1;
		this.y1=y1;
		this.x2=x2;
		this.y2=y2;
		this.intersected=false;
	}
	checkBoxIntersect(box){
		if(!(box.x1>this.x2 || box.x2<this.x1)){
			if(!(box.y1>this.y2 || box.y2<this.y1)){
				this.intersected=true;
			}else{
				this.intersected=false;
			}
		}else{
			this.intersected=false;
		}
		return this.intersected;
	}
}