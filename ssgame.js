let userSeq = [];
let gameSeq = [];

let highScore = 0;

let isStarted = false
let level = 0;
let h2 = document.querySelector("h2");

window.addEventListener("keydown", () => {
  if(!isStarted) {
    // console.log("key pressed");
    levelUp();
    isStarted = true; 
  }
});

function levelUp() {
  userSeq = [];

  level++;
  h2.innerText = `Level ${level}`;
  showScore();

  let randNum = Math.ceil(Math.random() *4);
  let randtile = document.querySelector(`#pat${randNum}`);
  gameSeq.push(randtile.getAttribute("id"));
  // console.log(gameSeq);
  flash(randtile);
}

function flash(tile) {

  let id = tile.getAttribute("id");
  let pat = id[id.length-1];
  // let t = document.querySelector(`#${id}`);
  // console.log(pat);

  
  tile.classList.add(`f${pat}`);
  setTimeout(() => {
    tile.classList.remove(`f${pat}`);
  }, 250);

}

function showScore() {
  let hscore = document.querySelector("#hScore");
  let score = document.querySelector("#score");
  // let userScore = score.innerText;
  // console.log(sb);

  if(highScore < level) {
    highScore = level-1;
    hscore.innerText = highScore;
  }
  score.innerText = level<0 ? 0 : level-1;
}

function matchSeq(idx) {

  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp, 500);
    }
  }
  else{
    let body = document.querySelector("body");
    body.classList.add("gameover");
    setTimeout( () => {
      body.classList.remove("gameover");
    }, 250);
    resetGame();    
  }
}

function clickTile() {
  flash(this);
  let tileSeq = this.getAttribute("id");
  userSeq.push(tileSeq);

  matchSeq(userSeq.length-1);
}


let tiles = document.querySelectorAll(".tile");
for(let tile of tiles) {
  tile.addEventListener("click", clickTile);
}


function resetGame() {
  h2.innerText = "Game Over. Press any key to start the game";
  showScore();
  userSeq = [];
  gameSeq = [];
  isStarted = false;
  level = 0;
}









