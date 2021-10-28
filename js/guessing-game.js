/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
    for ( let i = 0 ; i < array.length ; i++ ) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.feedbackText = '';

    };
    difference() {
        return Math.abs(this.playersGuess-this.winningNumber);
    };

    isLower() {
        if ( this.playersGuess < this.winningNumber ) return true;
        else return false;
    };

    playersGuessSubmission(num) {
        if ( num <= 0 || num > 100 ) {
            this.feedbackText = 'That is an invalid guess, try again'
            let phrase = document.getElementById('phraseDisplayed')
            phrase.innerText = this.feedbackText
        }
        else {
            this.playersGuess = num
            return this.checkGuess()
        }
    };

    checkGuess() {
        if ( this.playersGuess === this.winningNumber ) this.feedbackText =  `You Win! it is ${this.winningNumber}`;
        else if ( this.pastGuesses.includes(this.playersGuess) ) this.feedbackText =  "You have already guessed that number, try again";
        else {
            this.pastGuesses.push(this.playersGuess);
            document.querySelector(`#Previous-Guesses li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
            if ( this.pastGuesses.length === 5 ) this.feedbackText =  `You Lost. The number was ${this.winningNumber}`;
            else if ( this.difference() < 10 ) this.feedbackText =  'You\'re burning up! try again';
            else if ( this.difference() < 25 ) this.feedbackText =  'You\'re lukewarm, try again';
            else if ( this.difference() < 50 ) this.feedbackText =  'You\'re a bit chilly, try again';
            else if ( this.difference() < 100 ) this.feedbackText =  'You\'re ice cold! try again';
        }
        feedbackTextFunc(this.feedbackText);
        if ( this.pastGuesses.length === 5 || this.playersGuess === this.winningNumber) {
            document.getElementById('input').disabled = true;
            document.getElementById('submit-Button').disabled = true;
            document.getElementById('hint-Button').disabled = true;
            }
    };
// made the hint 4 numbers to make it harder.
    provideHint() {
        let newArray = [this.winningNumber];
        for ( let i = 0 ; i < 3 ; i ++ ) {
            newArray.push(generateWinningNumber())
        }
        this.feedbackText = `it is one of these numbers ${shuffle(newArray).join(' - ')}`
        feedbackTextFunc(this.feedbackText)
    };
}

const newGame = () => {
    let newGame = new Game()
    return newGame;
}

const feedbackTextFunc = (sentense) => {
    let phrase = document.getElementById('phraseDisplayed');
    phrase.innerText = sentense
    return sentense;
}

const playGame = () => {
    const game = newGame();

    const submit = document.getElementById('submit-Button');
    submit.addEventListener('click', () => {
        const playersGuess = +document.querySelector('input').value;
        document.querySelector('input').value = '';
        game.playersGuessSubmission(playersGuess); 
    });

    const hint = document.getElementById('hint-Button');
    hint.addEventListener('click',() => {
        game.provideHint()
    });

    const playAgain = document.getElementById('play-again-Button');
    playAgain.addEventListener('click',() => {
        location.reload();
    })
}

playGame()