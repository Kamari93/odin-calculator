console.log("Keep Going 🍊");
// DOM Maninpulation
let btn = document.querySelectorAll(".btn");
let currentScreen = document.querySelector(".screen-current");
let lastScreen = document.querySelector(".screen-last");
let clearButton = document.querySelector(".clear");
let deleteButton = document.querySelector(".delete");
let currentInput = '0';
let lastInput = '0';
let operator = '';

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
    lastInput = '0';
    operator = '';
    // displayLastInput();
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

// button functionality
let value = btn.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn.textContent);
        currentScreen.textContent = `${btn.textContent}`;
        return btn.textContent;
    })
});

// button event listeners
clearButton.addEventListener('click', clearInput);
deleteButton.addEventListener('click', deleteLastDigit);