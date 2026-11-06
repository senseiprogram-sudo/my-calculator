const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let currentInput = "0";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (value === "AC") {
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
            currentInput = "0";
            display.textContent = "0";
            return;
        }

        if (value === "DEL") {
            if (!waitingForSecondNumber) {
                currentInput = currentInput.length > 1
                    ? currentInput.slice(0, -1)
                    : "0";
                display.textContent = currentInput;
            }
            return;
        }

        if (["+", "-", "*", "/"].includes(value)) {
            if (firstNumber !== null && !waitingForSecondNumber) {
                firstNumber = calculateResult(
                    firstNumber,
                    Number(currentInput),
                    operator
                );
            } else {
                firstNumber = Number(currentInput);
            }

            operator = value;
            waitingForSecondNumber = true;
            currentInput = "0";
            display.textContent = "0";
            return;
        }

        if (value === "=") {
            if (operator === null || waitingForSecondNumber) return;

            const result = calculateResult(
                firstNumber,
                Number(currentInput),
                operator
            );

            currentInput = String(result);
            display.textContent = currentInput;

            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
            return;
        }

        if (value === "%") {
            currentInput = String(Number(currentInput) / 100);
            display.textContent = currentInput;
            return;
        }

        if (value === ".") {
            if (waitingForSecondNumber) {
                currentInput = "0";
                waitingForSecondNumber = false;
            }

            if (!currentInput.includes(".")) {
                currentInput += ".";
            }

            display.textContent = currentInput;
            return;
        }

        if (waitingForSecondNumber) {
            currentInput = value;
            waitingForSecondNumber = false;
        } else {
            currentInput = currentInput === "0"
                ? value
                : currentInput + value;
        }

        display.textContent = currentInput;
    });
});

function calculateResult(first, second, operation) {
    let result;

    switch (operation) {
        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            result = second === 0 ? "Error" : first / second;
            break;
    }

    if (typeof result === "number" && Number.isFinite(result)) {
        return Number(result.toPrecision(12));
    }

    return result;
}
