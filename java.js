function button(value) {
  document.getElementById("inputClaca").value += value;
}

function Clear() {
  document.getElementById("inputClaca").value = "";
}

function del() {
  var currentValue = document.getElementById("inputClaca").value;
  document.getElementById("inputClaca").value = currentValue.slice(0, -1);
}

function equal() {
  var input = document.getElementById("inputClaca").value;
  var result = calculate(input);

  if (result !== null) {
    document.getElementById("inputClaca").value = result;
  } else {
    document.getElementById("inputClaca").value = "Error";
  }
}

function calculate(input) {
  try {
    return eval(input);
  } catch (error) {
    return null;
  }
}
function calculate(input) {
  var operators = ["+", "-", "*", "/"];
  var numStack = [];
  var opStack = [];
  var numBuffer = "";

  for (var i = 0; i < input.length; i++) {
    var char = input.charAt(i);

    if (!isNaN(char) || char === ".") {
      numBuffer += char;
    } else if (operators.includes(char)) {
      numStack.push(parseFloat(numBuffer));
      numBuffer = "";
      while (
        opStack.length > 0 &&
        precedence(opStack[opStack.length - 1]) >= precedence(char)
      ) {
        numStack.push(
          applyOperator(opStack.pop(), numStack.pop(), numStack.pop())
        );
      }
      opStack.push(char);
    }
  }

  numStack.push(parseFloat(numBuffer));

  while (opStack.length > 0) {
    numStack.push(applyOperator(opStack.pop(), numStack.pop(), numStack.pop()));
  }

  if (numStack.length === 1 && isNaN(numStack[0])) {
    return null;
  } else {
    return numStack[0];
  }
}

function precedence(operator) {
  if (operator === "+" || operator === "-") {
    return 1;
  } else if (operator === "*" || operator === "/") {
    return 2;
  } else {
    return 0;
  }
}

function applyOperator(operator, b, a) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return null; // Division by zero
      }
      return a / b;
  }
}
