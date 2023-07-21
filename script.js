console.log("Keep Going 🍊");
// DOM Maninpulation
let btn = document.querySelectorAll(".btn");
let currentScreen = document.querySelector(".screen-current");
let lastScreen = document.querySelector(".screen-last");
let clearButton = document.querySelector(".clear");
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

// button functionality
let value = btn.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn.textContent);
        currentScreen.textContent = `${btn.textContent}`;
        return btn.textContent;
    })
});

clearButton.addEventListener('click', clearInput);