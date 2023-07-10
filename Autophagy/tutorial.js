/*const home=new Image();
home.src="Home.png";
const t1=new Image();
t1.src="Tutorial1.png";
const t2=new Image();
t2.src="Tutorial2.png";
const t3=new Image();
t3.src="Tutorial3.png";
const t4=new Image();
t4.src="Tutorial4.png";
const t5=new Image();
t5.src="Tutorial5.png";
const ps=new Image();
ps.src="PlaySmall.png";
const pb=new Image();
pb.src="PlayBig.png";

let enterCount=0;

function isMouseClicked(x1,x2,y1,y2){
	if((mousePosition[0]>x1 && mousePosition[0]<x2) && (mousePosition[1]>y1 && mousePosition[1]<y2) && mouseClicked){
		return true;
	}
}
function drawFirstScreen(){
	drawImage(home,0,0,canvas.width,canvas.height);
	drawImage(ps,320,320,320+262,320+79);
	if((mousePosition[0]>320 && mousePosition[0]<320+262) && (mousePosition[1]>320 && mousePosition[1]<320+79)){
		drawImage(pb,288,307,288+317,307+95);
	}
	if(!isMouseClicked(320,320+262,320,320+79)){
		drawFirstScreen();
	}

}
function drawSecondScreen(){
	drawImage(t1,0,0,canvas.width,canvas.height);
}
function drawThirdScreen(){
	drawImage(t2,0,0,canvas.width,canvas.height);
}
function drawFourthScreen(){
	drawImage(t3,0,0,canvas.width,canvas.height);
}
function drawFifthScreen(){
	drawImage(t4,0,0,canvas.width,canvas.height);
}
function drawSixthScreen(){
	drawImage(t5,0,0,canvas.width,canvas.height);
}
function manageTutorial(){
	drawFirstScreen();
	drawSecondScreen();
	drawThirdScreen();
	drawFourthScreen();
	drawFifthScreen();
	drawSixthScreen();
}*/