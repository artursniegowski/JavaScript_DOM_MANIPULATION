"use strict";

// start variables
// game patter - it is going to be a queue of moves for the user
let gamePattern = [];
// colors of the buttons
const buttonColors = ["red", "blue", "green", "yellow"];
// indication if the user can interact - play the game
let gameIsOn = false;
// level - on which the user is on - starts with zero
let level = 0;
// animation is in progress
let animationIsOn = false;

// getting a radnom number betwwen 0-3 (included the ends)
// and returns a random color from the array
const nextSequence = () =>  buttonColors[Math.floor(Math.random()*4)];

// addint to the queue the moves - creating the game pattern to follow
const buildGamePattern = (gamePatternList, numberMoves=1) =>{

    // animation started - you cant stop it !
    animationIsOn = true;

    for (let index = 0; index < numberMoves; index++) {
        gamePatternList.push(nextSequence())
    }
    setTitleText(`Showing Pattern...`);

    // showing the pattern
    showGamePattern(gamePattern, finishedAnimation)

};

// call back funciton for animation
const finishedAnimation = () => {
    // console.log("Done Animation");
    // setitng the new level
    level++;
    // set the title of the game
    setTitleText(`Level ${level}`);
    // animation finished
    animationIsOn = false;
};

// function for showing the pattern to the user  in reverse order, animation are nested
// whihc will make them apeare one by one !
const showGamePattern = (gamePatternList, callback) => {
    if (gamePatternList.length === 0){
        callback();
        return;
    }
    let elementName = gamePatternList[gamePatternList.length-1];
    $("#"+elementName).animate({opacity:0},600).animate({opacity:1},500, ()=>{
        showGamePattern(gamePatternList.slice(0,gamePatternList.length-1), callback);
    });

};


// function for palying the sound
const playSound = (soundURL) => {
    const audio = new Audio(soundURL);
    audio.play();
};

// play sound based on the color selected
const soundColor = (colorName) => {
    switch (colorName) {
        case 'red':
            playSound("sounds/red.mp3");
            break;
        case 'blue':
            playSound("sounds/blue.mp3");
            break;
        case 'green':
            playSound("sounds/green.mp3");
            break;
        case 'yellow':
            playSound("sounds/yellow.mp3");
            break;
        case 'END':
            playSound("sounds/wrong.mp3");
            break;
        default:
            console.log(colorName);
            break;
    }
};


// addding the press effect to the button for 100ms
const animatePress = (currentColor) => {
    const $currentButton = $("#"+currentColor);
    $currentButton.addClass("pressed");
    setTimeout( () => {
        $currentButton.removeClass("pressed");
    },100);
};

// checking if the rigth button was pressed
$(".btn").on("click", function (event) {

    // this event only works if we actually play the game
    // and the level is not being animated
    if (gameIsOn && !animationIsOn){
    
        // getting the color of the pressed element
        let userChosenColor = $(this).attr("id");
        
        // animating pressed color
        animatePress(userChosenColor);
        
        // checking if the gamePattern has move left 
        if (gamePattern.length > 0) {
            
            // if choosen the right tile sound ok - poping the last element from the game patern
            if (userChosenColor === gamePattern.pop()){
                soundColor(userChosenColor);
            } else { // if chosen the wrong tile
                // game over
                soundColor('END');
                // setting all values to default
                endGameClean();
            }

            // if game ends in the normal turn create a new level
            if(gamePattern.length === 0 && gameIsOn) {
                // build and simulate next level
                buildGamePattern(gamePattern, level);
            }
        }
    }
});

// setting the text in the h1 title
const setTitleText = (titleText) => {
    const $titleText =  $("#level-title");
    $titleText.text(titleText);
};

// cleanign the game after a game over
const endGameClean = () => {
    // setting the level back to 0
    level = 0;
    // setting the game over value
    gameIsOn = false;
    // cleaning the list of patterns - moves
    gamePattern = [];
    // setting the title
    setTitleText("GAME OVER! Press Any Key to Restart.");

    // adding the flashing red effect - game over
    const $gameOverBackground = $("body");
    $gameOverBackground.addClass("game-over");
    setTimeout( () => {
        $gameOverBackground.removeClass("game-over");
    },200);
};

// checking if any key was pressed
$(document).on('keydown', () => {
    // only for the first time when the game is not on
    if (!gameIsOn){
        // reseting the level
        level = 0;
        // fills the game Pattern list with random moves for the user to follow
        // initial game pattern
        buildGamePattern(gamePattern);
        // if so start the game
        gameIsOn = true;
    }
});