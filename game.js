var buttonColours=["red", "blue", "green", "yellow"];
//it will store the value of game pattern
var gamePattern=[];
//it will store the value of user pattern that is clicked by user
var userClickedPattern=[];

var started = false;
var level = 0;
//it will select from the entire documnet which "keyboard key is being pressed"
$(document).keypress(function() {
  //if the game is started it will execute
  if (!started) {
    //it will select the id"level-title" after the level passed it will change  the value of h1
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//it will select the class of which button is pressed and then apply a function to it hen it is being clicked
$(".btn").click(function() {
//it will store the id of button that is being clicked
  var userChosenColour = $(this).attr("id");
  //it will store the id of button that is clicked to empty array userClickedPattern
  userClickedPattern.push(userChosenColour);

  //it will pass the value of userChosenColour to playSound function to play the audio
  playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
//it is the function that will check that the user entered pattern is true or not
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
//if the user getwrong sequence it will execute
  playSound("wrong");

  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

//function will be called if game gets over

  startover();
    }

}

function nextSequence() {
    userClickedPattern = [];
    //it will increment the value of leevl
  level++;
  //it will update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  //1 creating a random no and storing it in randomNumber
    var randomNumber=Math.floor(Math.random()*4);
//it will select buttonColours
    var randomChosenColour=buttonColours[randomNumber];
    // it will add randomChosenColour to the empty array gamePattern
    gamePattern.push(randomChosenColour);
// here when the button is pressed it will be flashed
//"#" is used to search for an id +randomChosenColour can be red,yellow it will select add flash to it
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 //it will play audio
 playSound(randomChosenColour);
}
//function that will execute to play the sounds
function playSound(name) {
//it is the code to play the sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//it is the function that will add animation effect to the button that is being pressed
function animatePress(currentColor)
{
  //it add class "pressed" to the button that is being pressed to apply the effect
  $("#" + currentColor).addClass("pressed");
  //it will remove the affect after 100 millisecond by removing the class "pressed"
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//it you get wrong sequence it will restart the agame
function startover()
{
  level = 0;
  gamePattern = [];
  started = false;
}
