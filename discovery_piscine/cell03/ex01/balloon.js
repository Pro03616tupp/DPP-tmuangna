const balloon = document.getElementById("balloon");
const colors = ["red", "green", "blue"];

let size = 200;
let colorIndex = 0;

function updateBalloon() {
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size}px`;
    balloon.style.backgroundColor = colors[colorIndex];
}
balloon.addEventListener("click", function () {
    size += 10; 

    if (size > 420) {
        size = 200; 
    }
   
    colorIndex = (colorIndex + 1) % colors.length;
    updateBalloon();
});

balloon.addEventListener("mouseleave", function () {
    size = Math.max(200, size - 5); 
   
    colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    updateBalloon();
});