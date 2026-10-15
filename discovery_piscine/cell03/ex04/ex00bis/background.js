$(function () {
  let previousColor = "rgb(255, 255, 255)";

  $("#change-color").on("click", function () {
    let nextColor;

    do {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      nextColor = `rgb(${red}, ${green}, ${blue})`;
    } while (nextColor === previousColor);

    $("body").css("background-color", nextColor);
    previousColor = nextColor;
  });
});
