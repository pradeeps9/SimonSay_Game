let gameSeq = [];
let userSeq = [];


let scoreBoard = document.querySelector(".score");
let h2 = document.querySelector("h2");
let colors = ["green", "blue", "yellow", "red"];


let started = false;
let level = 0;

document.addEventListener("keydown", function () {
  if(started == false) {
    console.log("game is started.");
    started = true;

    levelUp();
  }
});

function flashTile(tile) {
  tile.classList.add("flash");

  setTimeout(() => {
    tile.classList.remove("flash");
  }, 250);
  
}

function levelUp() {

  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // random color
  let randIdx = Math.floor(Math.random() * 4);
  let randClr = colors[randIdx];
  let randTile = document.querySelector(`.${randClr}`);
  gameSeq.push(randClr);
  console.log(gameSeq);
  // console.log(randIdx, randClr, randTile);
  flashTile(randTile);

}

function matchSeq(idx) {
  // console.log("curr level", level);
  // console.log(gameSeq[level-1], userSeq[level-1]);

  if(gameSeq[idx] === userSeq[idx]){
    if(gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } 
  else {
    h2.innerText = "Game Over! Press any key to start";
    scoreBoard.innerText = `${level}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    resetGame();
  }

}

function clickTile () {
  flashTile(this);
  let clr = this.getAttribute("id");
  userSeq.push(clr);
  console.log(userSeq);

  matchSeq(userSeq.length-1);
}

let tiles = document.querySelectorAll(".tile");

for(let tile of tiles) {
  tile.addEventListener("click", clickTile);
}


function resetGame() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}




