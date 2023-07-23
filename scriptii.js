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


// button event listeners
clearButton.addEventListener('click', clearInput);
deleteButton.addEventListener('click', deleteLastDigit);
positiveNegative.addEventListener('click', togglePositiveNegative);
equalButton.addEventListener('click', calculate);
pointButton.addEventListener("click", appendDecimal);

// input variables for screen calculations
let currentInput = '0';
let lastInput = '';
let operator = '';
let shouldReset = true;
currentOperation = null;

// lastScreen.textContent = '';

// Screen functionality 
const displayCurrentInput = () => {
    currentScreen.textContent = currentInput;
};
displayCurrentInput();

const displayLastInput = () => {
    lastScreen.textContent = lastInput;
};
displayLastInput();

const clearInput = () => {
    currentInput = '0';
    lastInput = '';
    operator = '';
    displayLastInput();
    displayCurrentInput();
};

const deleteLastDigit = () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    };
    displayCurrentInput();
};

// add number to the display string 
const handleNumberClick = (num) => {
    if (currentInput === '0' || currentInput === '-0') {
        currentInput = num.toString(num);
    } else {
        currentInput += num.toString(num);
    };
    displayCurrentInput();
};

// handles (+ * - /) buttons and last input window
const handleOperatorClick = (op) => {
    if (operator !== '0' && lastInput !== '0') {
        calculate();
    };
    operator = op;
    lastInput = `${currentInput} ${op} `;
    currentInput = '0';
    // currentInput = currentScreen.textContent;
    displayLastInput();
    displayCurrentInput();
};

// deals with decimal vals
const appendDecimal = () => {
    // reset screen if eval func or other func triggers it to be true
    if (shouldReset) resetScreen(); //create this funct
    // if empty input while decimal has been clicked auto add zero before the decimal
    if (currentScreen.textContent === '') currentScreen.textContent = '0';
    // handles if input already has decimal so multiples can't be added
    if (currentScreen.textContent.includes('.')) return;
    // else if button pressed append decimal to input
    currentScreen.textContent += '.';
};

const handleKeyboardInput = (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key); //create this funct
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteLastDigit();
    if (e.key === 'Escape') clear(); //refactor
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
};

// for keyboard input
const convertOperator = (keyboardOperator) => {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '−';
    if (keyboardOperator === '+') return '+';
};

const calculate = () => {
    const num1 = parseFloat(lastInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '÷':
            currentInput = (num1 / num2).toString();
            break;
        default:
            return;
    };

    // reset the operator and last input after calc
    operator = '';
    // lastInput = lastInput + currentInput;
    lastInput += `${num2} ${equalButton.textContent}`;
    displayLastInput();
    displayCurrentInput();
};

const togglePositiveNegative = () => {
    if (currentInput !== '0') {
        if (currentInput[0] === '-') {
            // make positive
            currentInput = currentInput.slice(1);
        } else {
            // make negative
            currentInput = '-' + currentInput;
        }
    };
    displayCurrentInput();
};

// button functionality
let value = numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn.textContent);
        // currentScreen.textContent = `${btn.textContent}`;
        // return btn.textContent;
        handleNumberClick(btn.textContent);
    })
});

let operators = operatorButtons.forEach(operator => {
    operator.addEventListener("click", () => {

        // if (currentInput !== '0') { handleOperatorClick(operator.textContent); }
        handleOperatorClick(operator.textContent);
        // lastInput = `${lastInput} ${currentInput}`;
        // lastInput += ' =';
        // lastInput = lastInput.replaceAt(lastInput.length - 1, equalButton.textContent);
    });
});

// replaceAt string function
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};