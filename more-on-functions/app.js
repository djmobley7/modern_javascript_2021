const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameStarted = false;

const getPlayerChoice = function() {
    const selection = prompt('rock, paper or scissors', '').toUpperCase();
    if (selection !== ROCK && 
        selection !== PAPER &&
        selection !== SCISSORS) {
            alert(`Invalid choice, using default ${DEFAULT_CHOICE}`);
            return DEFAULT_CHOICE;
        }
    return selection;
}

const getComputerChoice = function() {
    const random = Math.random();
    if (random < 0.34) {
        return ROCK;
    } else if (random < 0.67) {
        return PAPER;
    } 
    return SCISSORS;
}

const getGameResult = (playerChoice, computerChoice) => { // using arrow function syntax
    let result = RESULT_COMPUTER_WINS;

    if (playerChoice === computerChoice) {
        result = RESULT_DRAW;
    } else if (
        playerChoice === ROCK && computerChoice === SCISSORS ||
        playerChoice === SCISSORS && computerChoice === PAPER ||
        playerChoice === PAPER && computerChoice == ROCK) {
            result = RESULT_PLAYER_WINS;
        }
        
    return result;
}

startGameBtn.addEventListener('click', function() {
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    console.log('Game started'); 

    const playerChoice = getPlayerChoice();
    console.log(`Player choice: ${playerChoice}`);

    const computerChoice = getComputerChoice();
    console.log(`Computer choice: ${computerChoice}`);

    const gameResult = getGameResult(playerChoice, computerChoice);
    console.log(gameResult);

    gameStarted = false;
})


// // function declaration
// function startGame() {
//     console.log('Game started');
// }
// startGameBtn.addEventListener('click', startGame);

// // function 'expession' using create anonymous function
// // using this method you cannot use it before defining it
// const start = function() {
//     console.log('Game started using anonymous function');
// }; // need semi-colon for anonymouse functions declarations
// startGameBtn.addEventListener('click', start);

// function is a type of object
// console.log(typeof startGame);
// console.log(startGame);
// console.dir(startGame);

// // create object with method greet
// const person = {
//     name: 'Dan',
//     greet: function greet() {
//         console.log(`Hello ${this.name}`);
//     }
// }

// person.greet();