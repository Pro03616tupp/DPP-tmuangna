const button = document.getElementById("change-color");
let previousColor = "rgb(255, 255, 255)";

button.addEventListener("click", function () {
    let newColor;

    do {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        newColor = `rgb(${red}, ${green}, ${blue})`;
    } while (newColor === previousColor);

    document.body.style.backgroundColor = newColor;
    previousColor = newColor;
});