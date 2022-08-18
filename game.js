var gamePattern = []; // The array that stores the buttons that the user must press
var userClickedPattern = []; // The array that stores the buttons that the user has pressed
var buttonColours = ["red", "blue", "green", "yellow"]; // The array of colors.
var gameHasStarted = false; //resets after the player loses.
var level = 0; // The level that the user has managed to get to. It gets displayed in the h1 tag once the game starts.
var currentLevel = 0; // This element is used as an index to help us compare the button that the user presses with the button stored in the memory.
const buttons = document.querySelectorAll('button');

var highScore = localStorage.getItem("highScore");
if (highScore !== null) {
  $("h2").text("High Score: " + highScore);
}

document.addEventListener('keydown', function(e) { // Initiate the game by pressing a random button

  if (!gameHasStarted) { // If the user presses a key for the first time, the game begins. If the user has already pressed a key before, the computer does nothing.
    gameHasStarted = true;

    setTimeout(function() {
      nextSequence();
    }, 800);
  }
});

$(".btn").click(function() { // User clicks button

  var userChosenColour = this.id; // We get the id of the button pressed by the user, which is also the name of the button e.g. red
  userClickedPattern.push(userChosenColour); // We add the button to the array of user
  animatePress(userChosenColour); // When we click a button, we temporarily change the css style and play a sound
  playSound(userChosenColour);
  var answerResult = checkAnswer(userChosenColour, currentLevel); // Every time the user clicks a button, we check if it's in the gamePattern array

  if (answerResult) {
    currentLevel++; // If the button clicked is correct, we continue to the next array element

    if (level > 0 && currentLevel === level) { //Checks if the user clicked all the right buuttons for the current round. The game continues.
      currentLevel = 0;
      userClickedPattern = [];

      document.querySelectorAll('button.btn').forEach(elem => { //Buttons temporarily disabled. Fixed a bug that allowed the player to spam buttons between the timeout function.
        elem.disabled = true;
      });

      $("h1").text("level " + level + " Complete!");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { // If the button clicked is wrong, we play a corresponding sound and restart the game
    startOver();
  }

});

function nextSequence() {

  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.random() * 4; //Generates a random number between 0-3 using the array buttonColours. Then we add the corresponding color to the gamePattern array
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);

  document.querySelectorAll('button.btn').forEach(elem => {
    elem.disabled = false;
  });

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentColor, currentIndex) { // Function that compares the button the user clicks and the buttons that's stored in the gamePattern and returns true if it's correct.
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    return true;
  } else return false;
}

function startOver() {

  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 500);

  if (level > localStorage.getItem("highScore")/100) {

    highScore = (level * 100) - 100;
    localStorage.setItem("highScore", highScore);
    $("h2").text("High Score: " + highScore);
    $("h1").text("New High Score! Press Any Key To Pay Again.");

  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
  }

  level = 0;
  gamePattern = [];
  gameHasStarted = false;
  currentLevel = 0;
  userClickedPattern = [];

}
