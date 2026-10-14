$(function () {
  const colors = ["red", "green", "blue"];
  const $balloon = $("#balloon");
  let size = 200;
  let colorIndex = 0;

  function drawBalloon() {
    $balloon.css({
      width: size,
      height: size,
      backgroundColor: colors[colorIndex]
    });
  }

  $balloon.on("click", function () {
    size += 10;

    if (size > 420) {
      size = 200;
      colorIndex = 0;
    } else {
      colorIndex = (colorIndex + 1) % colors.length;
    }

    drawBalloon();
  });

  $balloon.on("mouseleave", function () {
    size = Math.max(200, size - 5);
    colorIndex = (colorIndex + colors.length - 1) % colors.length;
    drawBalloon();
  });
});
