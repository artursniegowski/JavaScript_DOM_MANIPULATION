"use strict";


const buttonsElements = document.querySelectorAll("button");

const playAudio = (audioURL) => {
    let audioelement = new Audio(audioURL);
    audioelement.play();
}

const checkKeyPressed = (keyName) =>{
    switch (keyName) {
        case 'w':
            playAudio("sounds/tom-1.mp3");
            break;
        case 'a':
            playAudio("sounds/tom-2.mp3");
            break;
        case 's':
            playAudio("sounds/tom-3.mp3");
            break;
        case 'd':
            playAudio("sounds/tom-4.mp3");
            break;
        case 'j':
            playAudio("sounds/snare.mp3");
            break;
        case 'k':
            playAudio("sounds/kick-bass.mp3");
            break;
        case 'l':
            playAudio("sounds/crash.mp3");
            break;
    
        default:
            console.log(keyName);
            break;
    }
};


const animateButton = (keyPressed) => {
    const currentButton = document.querySelector("."+keyPressed);
    if (currentButton) {
        currentButton.classList.add("pressed");
        
        setTimeout( () => {
            currentButton.classList.remove("pressed");
        }, 100);
    }
        
}

buttonsElements.forEach(buttonElement => {
    buttonElement.addEventListener('click', function () {

        const buttonInnerElement = this.innerHTML
        checkKeyPressed(buttonInnerElement);
        animateButton(buttonInnerElement);

    });
});

// eventTarget.addEventListener("keydown", function (event) {
//     if (event.isComposing || event.keyCode === 229) {
//       return;
//     }
//     // do something
//   });

// checking for any key pressed on the keyboard
document.addEventListener("keydown", (event)=> {
    checkKeyPressed(event.key);
    animateButton(event.key);
})


