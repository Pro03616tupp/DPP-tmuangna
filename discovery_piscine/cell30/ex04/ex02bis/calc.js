$(function () {
  $("#calculator").on("submit", function (event) {
    event.preventDefault();

    const leftText = $("#left").val().trim();
    const rightText = $("#right").val().trim();
    const operator = $("#operator").val();
    const isWholeNumber = /^\d+$/;

    if (!isWholeNumber.test(leftText) || !isWholeNumber.test(rightText)) {
      alert("Error :(");
      return;
    }

    const left = Number(leftText);
    const right = Number(rightText);

    if ((operator === "/" || operator === "%") && right === 0) {
      alert("It's over 9000!");
      return;
    }

    let result;

    switch (operator) {
      case "+": result = left + right; break;
      case "-": result = left - right; break;
      case "*": result = left * right; break;
      case "/": result = left / right; break;
      case "%": result = left % right; break;
    }

    alert(result);
    console.log(result);
  });

  setInterval(function () {
    alert("Please, use me...");
  }, 30000);
});
