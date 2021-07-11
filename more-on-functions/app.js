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
    // if (selection !== ROCK && 
    //     selection !== PAPER &&
    //     selection !== SCISSORS) {
    //         alert(`Invalid choice, using default ${DEFAULT_CHOICE}`);
    //         return;
    //     }
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

// uses default parameter for playerChoice, only works for undef (other falsey values)
const getGameResult = (computerChoice, playerChoice = DEFAULT_CHOICE) => { // using arrow function syntax
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

startGameBtn.addEventListener('click', function() { // or () => {
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    console.log('Game started'); 

    const playerChoice = getPlayerChoice();
    console.log(`Player choice: ${playerChoice}`);

    const computerChoice = getComputerChoice();
    console.log(`Computer choice: ${computerChoice}`);

    let gameResult;
    if (playerChoice) {
        gameResult = getGameResult(computerChoice, playerChoice);
    } else {
        gameResult = getGameResult(computerChoice);
    } 
    console.log(gameResult);

    let message = `You picked ${playerChoice || DEFAULT_CHOICE}, computer picked ${computerChoice}: `;
    if (gameResult === RESULT_DRAW) {
          message += "You had a draw";
    } else if (gameResult === RESULT_PLAYER_WINS) {
        message += "You won";
    } else {
        message += "You lost";
    }
    alert(message);

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

// not related to the game


// function taking a callback (handler) and using variable args
const sum = (cb, ...nums) => {
    let sum = 0;
    for (const num of nums) {
        sum += num;
    }
    cb(sum);
}

const showSum = (sum) =>  {
    alert(sum);
}

sum(showSum, 1, 2, 3);

// deprecated way of using 'rest' operator, before ES6
const sum2 = function() {
    let sum = 0;
    for (const num of arguments) {
        sum += num;
    }
    return sum;
}