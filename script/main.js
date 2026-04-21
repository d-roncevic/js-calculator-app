document.querySelector("footer").textContent +=
  new Date().getFullYear() + " Dev Squad Alpha, All rights reserved.";

let displayValue = "0";
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    triggerShake();
    return "ERROR";
  } else {
    return a / b;
  }
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

const display = document.getElementById("display");

function updateDisplay() {
  display.value = displayValue;
}

function appendNumber(number) {
  if (displayValue === "0" || shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    displayValue = "0.";
    shouldResetDisplay = false;
    return;
  }

  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function setOperator(op) {
  if (operator !== null) calculate();

  firstOperand = displayValue;
  operator = op;
  shouldResetDisplay = true;
}

function backspace() {
  if (shouldResetDisplay) return;

  displayValue = displayValue.slice(0, -1);

  if (displayValue === "") {
    displayValue = "0";
  }

  updateDisplay();
}

function calculate() {
  if (operator === null || shouldResetDisplay) return;

  let result = operate(operator, firstOperand, displayValue);

  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000;
  }

  displayValue = result.toString();
  operator = null;
  firstOperand = null;
  shouldResetDisplay = true;

  updateDisplay();
}

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) appendNumber(e.key);
  if (e.key === "." || e.key === ",") appendDecimal();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    setOperator(e.key);
  }
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key.toLowerCase() === "c") clearDisplay();
  if (e.key === "Backspace") backspace();
});

function triggerShake() {
  const calc = document.getElementById("calculator");

  calc.classList.add("shake");

  setTimeout(() => {
    calc.classList.remove("shake");
  }, 300);
}
