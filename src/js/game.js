const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src="img/body.png";

let foodItem = new Array();
foodItem[0]= new Image();
foodItem[0].src="img/apple.png";
foodItem[1]= new Image();
foodItem[1].src="img/avocado.png";
foodItem[2]= new Image();
foodItem[2].src="img/banana.png";
foodItem[3]= new Image();
foodItem[3].src="img/carrot.png";
foodItem[4]= new Image();
foodItem[4].src="img/grape.png";
foodItem[5]= new Image();
foodItem[5].src="img/pineapple.png";
let foodNumber = Math.floor((Math.random() * 5));


let box = 32;


let score = 0;

let food = {
	x:Math.floor((Math.random()*17+1))*box,
	y:Math.floor((Math.random()*15+3))*box
};

let snake = [];
snake[0] = {
	x:9*box,
	y:10*box
};


document.addEventListener("keydown", direction);

let dir;

function endGame(){
	ctx.font = "80px Arial";
	ctx.fillText("~THE END~", box*2.5, box*8);
    clearInterval(game);

}

function  eatTail(head,arr){
   for(let i = 0; i<arr.length; i++){
   		if (head.x == arr[i].x && head.y == arr[i].y){
   			endGame();
   		}
   }
}

function direction(event){
	if(event.keyCode == 37&&dir != "right"){
		dir="left";
	}else if(event.keyCode == 38&&dir != "down"){
		dir="up";
	}else if(event.keyCode == 39&&dir != "left"){
		dir="right";
	}else if(event.keyCode == 40&&dir != "up"){
		dir="down";
	}
}

function drawGame(){
	ctx.drawImage(ground, 0,0);

	ctx.drawImage(foodItem[foodNumber],food.x,food.y);

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "red" : "green";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box*2.2, box*1.9);


	let snakeX = snake[0].x;
	let snakeY = snake[0].y;


	if(snakeX == food.x && snakeY == food.y) {
		score++;
		foodNumber = Math.floor((Math.random() * 5));
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop();


    if(snakeX<box || snakeX>17*box || snakeY<3*box || snakeY>17*box){
    	endGame();
    }


	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x:snakeX,
		y:snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame,100); //mls
