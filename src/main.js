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
    let gameOverHTML=`<h1>Game Over</h1><br><h3 onclick="location.reload()">click here to play again</h3>`;
    document.getElementById('hidden_tail').innerHTML=gameOverHTML;
    clearInterval(animator);
  }
}

const validateCoords=function (snake) {
  if (hasHitAnyEdge(snake)) {
    return true;
  }
  return isEatenItself(snake);
}

const hasHitAnyEdge=function (snake) {
  let edgeCaseHandlers={
    "north":function(head){
      return head.getY()==0;
    },
    "east":function(head){
      return head.getX()==numberOfCols-1;
    },
    "south":function(head){
      return head.getY()==numberOfRows-1;
    },
    "west":function(head){
      console.log(head.getX());
      return head.getX()==0 ;
    }
  }
  let head=snake.getHead();
  return edgeCaseHandlers[head.getDirection()](head);
}

const isEatenItself=function (snake) {
  let head=snake.getHead();
  let body=snake.getBody();
  let hasEatenList=body.filter(function (currentArg) {
    return head.isSameCoordAs(currentArg)}
  );
  return hasEatenList.length!=0;
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
  animator=setInterval(animateSnake,50);
}

window.onload=startGame;
