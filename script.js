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

const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll("#number");
const operatorBtns = document.querySelectorAll("#operator");
const clearBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#del");

let buttonCount = 0;
let currentOperand = "";
let previousOperand = "";
let justCalculated = false;
let operator = null;

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


operatorBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent !== "=") {
            if (currentOperand === "") return;
            /**if currentOperand exists */
            /**if an operator button is clicked, it's not the = operator, there is a previousOperand and an operator has already been selected but not yet = */
            if (previousOperand !== "" && operator !== null) {
                const result = operate(operator, Number(previousOperand), Number(currentOperand)); /**operate on the 2 numbers although = was not selected */
                previousOperand = String(result); /**the result becomes previousOperand */
                display.textContent = previousOperand; /**the result is displayed */
                currentOperand = "";
                /**if previousOperand does not exist yet */
            } else {
                previousOperand = currentOperand; /**then previouosOperand becomes currentOperand (the number just entered) */
                currentOperand = ""; /**empty currentOperand for new number */
            }
            operator = button.textContent;
            justCalculated = false;
            buttonCount = 0;
        }
        else if (button.textContent === "=") {
            if (previousOperand && currentOperand && operator) {
                let result = operate(operator, Number(previousOperand), Number(currentOperand));
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
});

delBtn.addEventListener("click", () => {
    if (display.textContent === currentOperand) {
        display.textContent = display.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    }   
});
