console.log("Keep Going 🍊");
// DOM Maninpulation
const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const currentScreen = document.querySelector(".screen-current");
const lastScreen = document.querySelector(".screen-last");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const pointButton = document.querySelector(".point");
const positiveNegative = document.getElementById('positive-negative');
const equalButton = document.getElementById('equal');
currentScreen.textContent = '0';

// input variables for screen calculations
let firstInput = '';
let lastInput = '';
let operator = '';
let shouldReset = false;
let currentOperation = null;


// Screen functionality 
const resetScreen = () => {
    currentScreen.textContent = '';
    shouldReset = false;
};

const appendNumber = (number) => {
    // only append if operation is not set 
    if (currentScreen.textContent === '0' || shouldReset) resetScreen();;
    currentScreen.textContent += number;
}


// For clear button
const clearInput = () => {
    currentScreen.textContent = '0';
    lastScreen.textContent = '';
    firstInput = '';
    lastInput = '';
    currentOperation = null;
};


// For delete button
const deleteLastDigit = () => {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
}

// deals with decimal vals
const appendDecimal = () => {
    // reset screen if eval func or other func triggers it to be true
    if (shouldReset) resetScreen();
    // if empty input while decimal has been clicked auto add zero before the decimal
    if (currentScreen.textContent === '') currentScreen.textContent = '0';
    // handles if input already has decimal so multiples can't be added
    if (currentScreen.textContent.includes('.')) return;
    // else if button pressed append decimal to input
    currentScreen.textContent += '.';
};

const setOperation = (operator) => {
    // if current operator not empty means equation is ready for eval
    if (currentOperation !== null) calculate();
    firstInput = currentScreen.textContent;
    currentOperation = operator;
    lastScreen.textContent = `${firstInput} ${currentOperation}`;
    // reset the current screen for the 3rd input
    shouldReset = true;
};

function calculate() {
    // don't calculate until the operator been provided and last input has been added to current screen..alolows change in operator
    if (currentOperation === null || shouldReset) return;
    // check if dividing by zero
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        alert('You can\'t divide by zero');
        return;
    };
    lastInput = currentScreen.textContent;
    currentScreen.textContent = roundCalc(
        operate(currentOperation, firstInput, lastInput));

    lastScreen.textContent = `${firstInput} ${currentOperation} ${lastInput} =`;
    // set current  operation to empty after eval for new eval
    currentOperation = null;
};

const roundCalc = (number) => {
    return Math.round(number * 1000) / 1000;
}

const handleKeyboardInput = (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLastDigit();
    if (e.key === 'Escape') clearInput(); //refactor
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
};

// for keyboard input
const convertOperator = (keyboardOperator) => {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
};

let add = (a, b) => {
    return a + b;
};

let subtract = (a, b) => {
    return a - b;
};

let multiply = (a, b) => {
    return a * b;
};

let divide = (a, b) => {
    return a / b
};

let operate = (operator, a, b) => {
    // convert a,b to the number type
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        // if improper inputs return nothing
        default:
            return null;
    };
};


const togglePositiveNegative = () => {
    if (currentScreen.textContent !== '0') {
        if (currentScreen.textContent[0] === '-') {
            // make positive
            currentScreen.textContent = currentScreen.textContent.slice(1);
        } else {
            // make negative
            currentScreen.textContent = '-' + currentScreen.textContent;
        }
    };
};

// button functionality
let value = numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        appendNumber(btn.textContent);
    })
});

let operators = operatorButtons.forEach(operator => {
    operator.addEventListener("click", () => {
        setOperation(operator.textContent);
    });
});


// button event listeners
window.addEventListener('keydown', handleKeyboardInput)
clearButton.addEventListener('click', clearInput);
deleteButton.addEventListener('click', deleteLastDigit);
positiveNegative.addEventListener('click', togglePositiveNegative);
equalButton.addEventListener('click', calculate);
pointButton.addEventListener('click', appendDecimal);
