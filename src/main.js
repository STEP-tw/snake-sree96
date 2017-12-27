let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  isGameOver(snake);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const isGameOver=function (snake) {
  if (validateCoords(snake)) {
    let gameOverHTMl=`<h3>Game Over</h3><br><h5 onclick="location.reload()">click here to play again</h5>`;
    document.getElementById('hidden_tail').innerHTML=gameOverHTMl;
    clearInterval(animator);
  }
}

const validateCoords=function (snake) {
  let headCoord=snake.getHead().getCoord();
  if (headCoord[0]<0||headCoord[0]>=numberOfCols||headCoord[1]<0||headCoord[1]>=numberOfRows) {
    return true;
  }
  return  isEatenItself(snake);
}

const isEatenItself=function (snake) {
  let head=snake.getHead();
  let body=snake.getBody();
   console.log(body.includes(head));
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
