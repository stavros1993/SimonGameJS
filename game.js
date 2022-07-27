var gamePattern = []; // The array that stores the buttons that the user must press
var userClickedPattern = []; // The array that stores the buttons that the user has pressed
var buttonColours = ["red", "blue", "green", "yellow"]; // The array of colors.
var gameHasStarted = false; //resets after the player loses.
var level = 0; // The level that the user has managed to get to. It gets displayed in the h1 tag once the game starts.
var currentLevel = 0; // This element is used as an index to help us compare the button that the user presses with the button stored in the memory.

document.addEventListener('keydown', function(e) { // Initiate the game by pressing a random button

  if (!gameHasStarted) { // If the user presses a key for the first time, the game begins. If the user has already pressed a key before, the computer does nothing.
    gameHasStarted = true;

    setTimeout(function() {
      nextSequence();
    }, 1000);
  }

});

$(".btn").click(function() { // User clicks button

  if (!gameHasStarted) { // If the user hasn't pressed a key before, pressing buttons does nothing.
    return;
  }

  var userChosenColour = this.id; // We get the id of the button pressed by the user, which is also the name of the button e.g. red
  userClickedPattern.push(userChosenColour); // We add the button to the array of user
  animatePress(userChosenColour); // When we click a button, we temporarily change the css style and play a sound
  playSound(userChosenColour);

  var answerResult = checkAnswer(userChosenColour, currentLevel); // Every time the user clicks a button, we check if it's in the gamePattern array
  if (answerResult) {
    currentLevel++; // If the button clicked is correct, we continue to the next array element
  } else { // If the button clicked is wrong, we play a corresponding sound and restart the game

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

  if ((currentLevel === level) && (currentLevel != 0) && (level != 0)) { //The user won this round by clicking all the right buttons, so the game continues
    currentLevel = 0;
    userClickedPattern = [];

    setTimeout(function() {
      nextSequence();
    }, 1000);
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

function checkAnswer(currentColor, currentIndex) { // Function that checks each button the user clicks.
                                                  // Has 2 parameters, the color of the button pressed by the user and the currentIndex that's used as an array index
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    return true;
  } else return false;

}

function startOver() {

  level = 0;
  currentLevel = 0;
  gameHasStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Game Over, Press Any Key to Restart");

}
