/* Initialize game variables */

const tiles = ['green','red','yellow','blue' ];
let sequence = [];
let playerSequence = []; 
const started = false; 
let level = 0; 

const title = document.getElementById('level-title');
const body = document.querySelector('body');

let buttonColor = ["red", "blue", "green", "yellow"]; //ok
const btn = document.querySelectorAll('button');


/* GAME STARTS */

window.onload = function() {
    title.innerHTML = "Press Any Key To Start";
}

window.onkeydown = function() {
  if (!started) {
    nextSequence();
    started = true;
  }
};



function nextSequence(){ // Initiate new sequence
    playerSequence = [];
    level++;
  
   title.innerHTML = "Level " + level;
  
    let randomNumber = Math.floor(Math.random()*tiles.length);
    let randomChosenColor = buttonColor[randomNumber]; 
    sequence.push(randomChosenColor); 

  
    playSound(randomChosenColor);
    animateBlink(randomChosenColor);
  
    
  }

window.onclick = function(e) {
  let userChosenColor = e.target.id;
  playerSequence
.push(userChosenColor);

  playSound(userChosenColor); 
  animatePress(userChosenColor);

  checkAnswer(playerSequence.length-1);
};



function checkAnswer(currentLevel) { // compare sequence & playerSequence
 
  if (sequence[currentLevel] === playerSequence
[currentLevel]) {
    console.log("success");
    if (playerSequence
    .length === sequence.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    body.classList.add("game-over");
   title.innerHTML = "Game Over, Press Any Key to Restart";

    setTimeout(function () {
      body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}


function startOver() { //Took player to next level
  level = 0;
  sequence = [];
  started = false;
}

function playSound(color) { //Define wich sound to play acccording to math.random
  let sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(currentColor) { //Animate button pressed by player
    let color = document.getElementById(`${currentColor}`);
    console.log(color);
  color.classList.add("pressed");
  setTimeout(function () { 
    color.classList.remove("pressed");
  }, 100);
}



function animateBlink(randomChosenColor) { //Animate each button for each newSequence
    let color = document.getElementById(`${randomChosenColor}`);
    console.log(color);
    color.classList.add("blink");
    setTimeout(() => {
        color.classList.remove("blink");
    }, 100);
}