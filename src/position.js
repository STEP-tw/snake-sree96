const _directions=["north","east","south","west","north"];

const randomDirection=function() {
  let index=generateRandomNumberBetween(0,_directions.length);
  return _directions[index];
}

const Position=function(x,y,direction) {
  this.x=x;
  this.y=y;
  this.direction=direction;
}

const actions={};

actions.east=(x,y)=>[x+1,y];
actions.west=(x,y)=>[x-1,y];
actions.north=(x,y)=>[x,y-1];
actions.south=(x,y)=>[x,y+1];

Position.prototype.next=function() {
  let nextCoord=actions[this.direction](this.x,this.y);
  return new Position(nextCoord[0],nextCoord[1],this.direction);
}

Position.prototype.turnLeft=function() {
  let currentIndex=_directions.lastIndexOf(this.direction);
  let newDirection=_directions[currentIndex-1];
  return new Position(this.x,this.y,newDirection);
}

Position.prototype.turnRight=function() {
  let currentIndex=_directions.indexOf(this.direction);
  let newDirection=_directions[currentIndex+1];
  return new Position(this.x,this.y,newDirection);
}

Position.prototype.isSameCoordAs=function(other) {
  return this.x==other.x && this.y==other.y;
}

Position.prototype.getCoord=function() {
  return [this.x,this.y];
}
Position.prototype.getDirection=function() {
  return this.direction;
}

Position.prototype.getX=function() {
  return this.x;
}

Position.prototype.getY=function() {
  return this.y;
}
const generateRandomPosition=function(maxX,maxY) {
  let x=generateRandomNumberBetween(0,maxX);
  let y=generateRandomNumberBetween(0,maxY);
  let direction=randomDirection();
  return new Position(x,y,direction);
}
