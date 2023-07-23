console.log("Keep Going 🍊");
// DOM Maninpulation
let btn = document.querySelectorAll(".num");
let operatorButtons = document.querySelectorAll(".operator");
let currentScreen = document.querySelector(".screen-current");
let lastScreen = document.querySelector(".screen-last");
let clearButton = document.querySelector(".clear");
let deleteButton = document.querySelector(".delete");
let positiveNegative = document.getElementById('positive-negative');
let equalButton = document.getElementById('equal');
let currentInput = '0';
let lastInput = '';
let operator = '';
let shouldReset = true;

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
}

// button event listeners
clearButton.addEventListener('click', clearInput);
deleteButton.addEventListener('click', deleteLastDigit);
positiveNegative.addEventListener('click', togglePositiveNegative);
equalButton.addEventListener('click', calculate);


// button functionality
let value = btn.forEach(btn => {
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