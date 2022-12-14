"use strict";

let randomNumber1 = Math.floor((Math.random()*6)+1);
let randomNumber2 = Math.floor((Math.random()*6)+1);

const dicePlayers = document.querySelectorAll(".dice img");

/**
 * 
 * @param {HTMLElement} element 
 * @param {String} sourceFile 
 */
const setDicePicture = (element, sourceFile) =>{
    element.setAttribute("src",sourceFile);
}

/**
 * 
 * @param {Number} num 
 * @returns {String}
 */
const chooseFileName = (num) => {
    return `images/dice${num}.png`;
}

// execute the dice throw
setDicePicture(dicePlayers[0], chooseFileName(randomNumber1));
setDicePicture(dicePlayers[1], chooseFileName(randomNumber2));

const titleElement = document.querySelector(".container h1");

/**
 * 
 * @param {String} titleName 
 */
const setTitle = (titleName) => {
    titleElement.textContent = titleName;  
}

if (randomNumber1 === randomNumber2){
    setTitle("Draw!")
}else if (randomNumber1 > randomNumber2) {
    setTitle("🚩 Player 1 Wins!")
}else {
    setTitle("Player 2 Wins! 🚩")
}