//Global const

const cluePauseTime = 333;     //duration in between clues
const nextClueWaitTime = 1000; //duration before clue start sequence

//Global Variables

var patternEasy = [];       //5pattern array
var patternMedium = [];     //7pattern array
var patternDifficult = [];  //10pattern array
var progress = 0;           //The current round, used to check user progress thru the sequence
var gamePlaying = false;    
var tonePlaying = false;
var volume = 0.5;                //SIMONS SOUNDS
var guessCounter = 0;            //user guess counter on current sequence attempt
var clueHoldTime;                //duration for clue light/sound
var chancesBeforeLoss = 2;       //three chances incorrect before game over
var easyMode = false;            //toggle easy mode for 5pattern
var mediumMode = false;          //toggle medium mode for 7pattern
var difficultMode = false;       //toggle difficult mode for 10pattern
var sequenceInitialized = false; //change diff midgame? => call stopGame().... used for changeDiffCheck()
var speedFactor = 1;             //speed up playbck sequence as rounds increase

//Random number generator used for pattern sequence creation on buttons1,2,3,4
function getRandomIntInclusive(min, max) { 
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function startGame() {
  
  //Initialize game variables
  progress = 0;           //Start at round 0 with 1step pattern, next round with 2step pattern etc.
  gamePlaying = true;
  clueHoldTime = 1000;    //Whenever game starts, ensure clueHoldTime is reset to default
  chancesBeforeLoss = 2;  //iterate down to 0, three guess() before stopGame()
  speedFactor = 1;        //default playback speed
  console.log("speed factor reset" + speedFactor);
  
  //Swap start and stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("endBtn").classList.remove("hidden");
  
    //Populate the pattern[] array randomly before gameplay initiates
    //Array length determined by EASY MEDIUM or HARD button toggle
    //Only once array is populated, display remaining lives, chancesBeforeLoss
    
    if (easyMode && !mediumMode && !difficultMode) {
      for (let i = 0; i < 5; i++) { 
        let temp = 0;
        temp = getRandomIntInclusive(1, 4);
        patternEasy[i] = temp;
      }
      updateLives();
      sequenceInitialized = true;
      document.getElementById("output").classList.remove("hidden");
    }
    else if (mediumMode && !easyMode && !difficultMode) {
      for (let i = 0; i < 7; i++) { 
        let temp = 0;
        temp = getRandomIntInclusive(1, 4);
        patternMedium[i] = temp;
      }
      updateLives();
      sequenceInitialized = true;
      document.getElementById("output").classList.remove("hidden");
    }
    else if (difficultMode && !easyMode && !mediumMode) {
      for (let i = 0; i < 10; i++) { 
        let temp = 0;
        temp = getRandomIntInclusive(1, 4);
        patternDifficult[i] = temp;
      }
      updateLives();
      sequenceInitialized = true;
      document.getElementById("output").classList.remove("hidden");
    }
    else {
      stopGame();
      alert("Please select a difficulty!");
    }
  
  //Start the game by prompting user for first clue
  playClueSequence();
  
}

function stopGame() {
  
  //Quit condition or error detected or 
  //Basically turn the game off
  gamePlaying = false;
  sequenceInitialized = false;
  
  //Revert start and stop buttons back to normal
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("endBtn").classList.add("hidden");
  
  var toughLuckMessage = "Better luck next time!";
  document.getElementById('output').innerHTML = toughLuckMessage;
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  context.resume()
  updateLives();
  guessCounter = 0;
  let delay = nextClueWaitTime - speedFactor * 60;      //difficult mode is fun thanks to speedFactor
  for (let i = 0; i <= progress; i++) {
    if (easyMode) {
      console.log("play single clue: " + patternEasy[i] + " in " + delay + "ms");
      setTimeout(playSingleClue, delay, patternEasy[i]);
    }
    if (mediumMode) {
      console.log("play single clue: " + patternMedium[i] + " in " + delay + "ms");
      setTimeout(playSingleClue, delay, patternMedium[i]);
    }
    if (difficultMode) {
      console.log("play single clue: " + patternDifficult[i] + " in " + delay + "ms");
      setTimeout(playSingleClue, delay, patternDifficult[i]);
    }
    delay += clueHoldTime - speedFactor * 15;
    delay += cluePauseTime - speedFactor * 15;
  }
}

//Specifically the condition where no lives left, and user loses
function loseGame() {
  stopGame();
  alert("Game over man! The machines win again!");
  
  var tryAgainMessage = "Is that the best you got?";      
  document.getElementById('output').innerHTML = tryAgainMessage;
}

//Specifically the win condition where progress is array size and sequence correctly guessed
function winGame () {
  stopGame();
  alert("Crisis averted! You decrypted the authentication key to shut down SIMON!");
  
  var victoryMessage = "Rainbow Overdrive Protocol disabled. Good work!"
  document.getElementById('output').innerHTML = victoryMessage;
}

//Button behavior
//Do nothing if game has not started
//Do stuff depending on difficulty selected and guess sequence
function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  
  if (easyMode) {    //EXECUTE BRANCH ONLY IF EASYMODE IS ENABLED
    if (patternEasy[guessCounter] == btn) {
      if(guessCounter == progress) {
        if(progress == patternEasy.length - 1) { //Win condtion => when max progress reached
          winGame();                             //& correct pattern entered, trigger winGame()
        }
        else {                       //Good guess & pattern, so go to next round =>
          progress++;                //Increment round
          chancesBeforeLoss = 2;     //Reset chances before loss
          speedFactor++;
          console.log("speed factor increase" + speedFactor);
          playClueSequence();        //And play next sequence
        }
      }
      else {
          guessCounter++;
      } 
    }
    //Player gets 3 lives before loseGame()
    else if ( chancesBeforeLoss == 2 || chancesBeforeLoss == 1 ) {
      chancesBeforeLoss--;
      updateLives();
    }
    else if ( chancesBeforeLoss == 0 ) {    //Bad guess, no lives left, player loses
      loseGame();
    }
  }
  if (mediumMode) {    //EXECUTE BRANCH ONLY IF MEDIUMMODE IS ENABLED
    if (patternMedium[guessCounter] == btn) {
      if(guessCounter == progress) {
        if(progress == patternMedium.length - 1) { //Win condtion => when max progress reached
          winGame();                               //& correct pattern entered, trigger winGame()
        }
        else {                       //Good guess & pattern, so go to next round =>
          progress++;                //Increment round
          chancesBeforeLoss = 2;     //Reset chances before loss
          speedFactor++;
          console.log("speed factor increase" + speedFactor);
          playClueSequence();        //And play next sequence
        }
      }
      else {
          guessCounter++;
      } 
    }
    //Player gets 3 lives before loseGame()
    else if ( chancesBeforeLoss == 2 || chancesBeforeLoss == 1 ) {
      chancesBeforeLoss--;
      updateLives();
    }
    else if ( chancesBeforeLoss == 0 ) {    //Bad guess, no lives left, player loses
      loseGame();
    }
  }
  if (difficultMode) {   //EXECUTE BRANCH ONLY IF DIIFICULTMODE IS ENABLED
    if (patternDifficult[guessCounter] == btn) {
      if(guessCounter == progress) {
        if(progress == patternDifficult.length - 1) { //Win condtion => when max progress reached
          winGame();                                  //& correct pattern entered, trigger winGame()
        }
        else {                       //Good guess & pattern, so go to next round =>
          progress++;                //Increment round
          chancesBeforeLoss = 2;     //Reset chances before loss
          speedFactor++;
          console.log("speed factor increase" + speedFactor);
          playClueSequence();        //And play next sequence
        }
      }
      else {
          guessCounter++;
      } 
    }
    //Player gets 3 lives before loseGame()
    else if ( chancesBeforeLoss == 2 || chancesBeforeLoss == 1 ) {
      chancesBeforeLoss--;
      updateLives();
    }
    else if ( chancesBeforeLoss == 0 ) {    //Bad guess, no lives left, player loses
      loseGame();
    }
  }
  
}

function lightButton(btn) {
  
  document.getElementById("button"+btn).classList.add("lit") 
}

function clearButton(btn) {
  
  document.getElementById("button"+btn).classList.remove("lit")
}

//This is the difficulty section, wired to the difficulty buttons
function setEasy() {
  console.log("user selected easy mode: 5 rounds");
  easyMode = true;
  mediumMode = false;
  difficultMode = false;
  document.getElementById("easy").classList.add("lit");
  document.getElementById("medium").classList.remove("lit");
  document.getElementById("difficult").classList.remove("lit");
  
  changeDiffCheck();
}

function setMedium() {
  console.log("user selected medium mode: 7 rounds");
  easyMode = false;
  mediumMode = true;
  difficultMode = false;
  document.getElementById("easy").classList.remove("lit");
  document.getElementById("medium").classList.add("lit");
  document.getElementById("difficult").classList.remove("lit");
  
  changeDiffCheck();
}

function setDifficult() {
  console.log("user selected difficult mode: 10 rounds");
  easyMode = false;
  mediumMode = false;
  difficultMode = true;
  document.getElementById("easy").classList.remove("lit");
  document.getElementById("medium").classList.remove("lit");
  document.getElementById("difficult").classList.add("lit");
  
  changeDiffCheck();
}

//This is called anytime we need to update user with lives left (chancesBeforeLoss)
function updateLives() {
  var displayChances = chancesBeforeLoss;
  var flavorText = " tries remaining"
  document.getElementById('output').innerHTML = displayChances + flavorText;
}

//This is for naughty users who try to change difficulty after game has started
function changeDiffCheck() {
  if (gamePlaying) {
    if (progress > 0 || sequenceInitialized) {
      stopGame();
      alert("Hmm. Error detected. That wasn't really a color input. The matrix array failed to compile.")
    }
  }
}

// Sound Synthesis Functions aka SIMONS SOUNDS
// All the following code is used to generate sounds when buttons clicked
// We had to create another oscillator to get polyphony
// Then include more values in freqMap, and only call 'related' notes, ie., C3 & C4
const freqMap = {
  1: 261.6,  // C4
  2: 329.6,  // E4
  3: 392,    // G4
  4: 466.2,  // Bf4
  5: 162.5,  // C3
  6: 164.8,  // E3
  7: 196,    // G3
  8: 233.1   // Bf3
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  
  m.frequency.value = freqMap[btn + 4];
  n.gain.setTargetAtTime(volume * 0.5,context.currentTime + 0.05,0.025)

  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    
    m.frequency.value = freqMap[btn + 4];
    n.gain.setTargetAtTime(volume * 0.5,context.currentTime + 0.05,0.025)
    
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  n.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var m = context.createOscillator()
var g = context.createGain()
var n = context.createGain()
g.connect(context.destination)
n.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
n.gain.setValueAtTime(0,context.currentTime)
m.connect(n)
m.start(0)
o.connect(g)
o.start(0)