const playAgain = document.querySelector(".play-again"); 
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");


let correctLetters , currentWord , wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = []
    wrongGuessCount = 0
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`; 
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class = "letter"></li>`).join(""); // create a _ 
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word , hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        // show end game page
        const modalText = isVictory ? `You found the word: ` : `The correct word was: `;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b> ${currentWord} </b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button , clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter , index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter; // update letter 
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed"); // add class
            }
        })
    } 

    else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`; // update hangman

    }

    button.disabled = true; // update button
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; // show incorrect guesses

    // check count of guess
    if(wrongGuessCount === maxGuesses) return gameOver(false); 
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button); // create a button
    button.addEventListener("click" , e => initGame(e.target , String.fromCharCode(i))); // add event
}

getRandomWord();

playAgain.addEventListener("click" , getRandomWord);