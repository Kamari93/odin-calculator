console.log("Keep Going 🍊");
let btn = document.querySelectorAll(".btn");
let currentScreen = document.querySelector(".screen-current");

let value = btn.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn.textContent);
        currentScreen.textContent = `${btn.textContent}`;
        return btn.textContent;
    })
});

