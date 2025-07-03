function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1/num2;
};

function operate(operator, operand1, operand2) {
    if (operator === "+") {
        return add(operand1, operand2);
    }
    else if (operator === "-") {
        return subtract(operand1, operand2);
    }
    else if (operator === "x") {
        return multiply(operand1, operand2);
    }
    else if (operator === "÷") {
        if (operand2 === 0) {
            alert("Did no one teach you about 0 division?");
            return;
        }
        return divide(operand1, operand2);
    }
}

function formatResult(result) {
    const maxLength = 16;

    if (!isFinite(result)) return "Error";

    // Round result to 12 significant digits to fix floating point issues
    const rounded = parseFloat(result.toPrecision(12));

    let resultStr = String(rounded);

    // Slice if result is still too long
    if (resultStr.length > maxLength) {
        resultStr = resultStr.slice(0, maxLength);
    }

    return resultStr;
}

const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll("#number");
const operatorBtns = document.querySelectorAll("#operator");
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#del");
const decimalBtn = document.querySelector("#decimal");

let buttonCount = 0;
let currentOperand = "";
let previousOperand = "";
let justCalculated = false;
let operator = null;
let decimalUsed = false;

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (buttonCount <16) {
            if (justCalculated) {
                currentOperand = "";
                justCalculated = false;
            }
            currentOperand += button.textContent;
            display.textContent = currentOperand;
            buttonCount ++;
            }
        })
});

decimalBtn.addEventListener("click", () => {
    if (decimalUsed === false) {
        if (currentOperand !== "") {
            display.textContent += ".";
            currentOperand += ".";
            decimalUsed = true;
        }}
});

operatorBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent !== "=") {
            if (currentOperand === "") return;
            /**if currentOperand exists */
            /**if an operator button is clicked, it's not the = operator, there is a previousOperand and an operator has already been selected but not yet = */
            if (previousOperand !== "" && operator !== null) {
                let result = operate(operator, Number(previousOperand), Number(currentOperand)); /**operate on the 2 numbers although = was not selected */
                result = formatResult(result);
                previousOperand = String(result); /**the result becomes previousOperand */
                display.textContent = previousOperand; /**the result is displayed */
                currentOperand = "";
                decimalUsed = false;
                /**if previousOperand does not exist yet */
            } else {
                previousOperand = currentOperand; /**then previouosOperand becomes currentOperand (the number just entered) */
                currentOperand = ""; /**empty currentOperand for new number */
                decimalUsed = false;
            }
            operator = button.textContent;
            justCalculated = false;
            buttonCount = 0;
        }
        else if (button.textContent === "=") {
            if (previousOperand && currentOperand && operator) {
                let result = operate(operator, Number(previousOperand), Number(currentOperand));
                result = formatResult(result);
                if (String(result).length >= 16) {
                    result = String(result).slice(0, 16);
                }
                operator = null;
                currentOperand = String(result);
                previousOperand = "";
                justCalculated = true;
                display.textContent = result;
            }   
        }
    })
});

clearBtn.addEventListener("click", () => {
    display.textContent = "";
    currentOperand = "";
    previousOperand = "";
    decimalUsed = false;
});

delBtn.addEventListener("click", () => {
    if (display.textContent === currentOperand) {
        display.textContent = display.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }   
});

function handleKeyPress(e) {
    const key = e.key;


if (!isNaN(key) && key !== " ") {
    numberBtns.forEach(btn => {
        if (btn.textContent === key) {
            btn.click();
        }
    })
}

if (key === ".") {
    decimalBtn.click();
} 

if (key === "+" || key === "-" || key === "*" || key === "/" || key ==="x" || key === "÷") {
    let mappedKey = key;
    if (key === "*") mappedKey = "x";
    if (key === "/") mappedKey = "÷";
    operatorBtns.forEach(btn => {
        if (btn.textContent === mappedKey) {
            btn.click();
        }
    })
}

if (key === "Enter" || key === "=") {
    operatorBtns.forEach(btn => {
        if (btn.textContent === "=") {
            btn.click();
        }
    })
}

if (key === "Backspace") {
    delBtn.click();
}

if (key === "Escape" || key.toLowerCase() === "c") {
    clearBtn.click();
}
}

document.addEventListener("keydown", handleKeyPress);
