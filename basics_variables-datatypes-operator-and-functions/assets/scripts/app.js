
const defaultResult = 0;
let currentResult = defaultResult;
let log = [];

function add() {
    const oldResult = currentResult;
    const userInput = getUserInput();
    currentResult += userInput;
    setUserOutput('+', currentResult, userInput);
    writeToLog('ADD', oldResult, userInput, currentResult);
}

function subtract() {
    const oldResult = currentResult;
    const userInput = getUserInput();
    currentResult -= userInput;
    setUserOutput('-', currentResult, userInput);
    writeToLog('SUB', oldResult, userInput, currentResult);
}

function multiply() {
    const oldResult = currentResult;
    const userInput = getUserInput();
    currentResult += userInput;
    setUserOutput('*', currentResult, userInput);
    writeToLog('MUL', oldResult, userInput, currentResult);
}

function divide() {
    const oldResult = currentResult;
    const userInput = getUserInput();
    currentResult /= userInput;
    setUserOutput('/', currentResult, userInput);
    writeToLog('DIV', oldResult, userInput, currentResult);
}

function getUserInput() {
    // HTML input fields are returned as strings, so we need to convert to a number type here (because we are doing numeric operations later)
    // alternatively we can use + function in front of the string value e.g. 
    // return +userInput.value;
    return parseInt(userInput.value);
}

function setUserOutput(operator, oldResult, userInput) {
    const equation = `${currentResult} ${operator} ${userInput} =`;
    this.outputResult(currentResult, equation);
}

function writeToLog(operator, oldResult, userInput, newResult) {
    const logEntry = {
        operator: operator,
        userInput: userInput,
        oldResult: oldResult,
        newResult: newResult
    };

    log.push(logEntry);

    // user console.log to help with debugging
    console.log(log);
}

addBtn.addEventListener('click', /* the button event */ add /* the js function to execute */);
subBtn.addEventListener('click', subtract);
mulBtn.addEventListener('click', multiply);
divBtn.addEventListener('click', divide);
