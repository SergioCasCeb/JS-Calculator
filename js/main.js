const calculatorKeys = document.querySelectorAll(".calculator-btns button");
const previousDisplay = document.querySelector(".previous-operation");
const currentDisplay = document.querySelector(".current-operation");
const deleteBtn = document.querySelector(".delete");
let currentDisplayValue = '';
let previousDisplayValue = '';
let operator = '';
let result = 0;

calculatorKeys.forEach( key => {
    key.addEventListener('click', () => {
        let keyValue = key.textContent;
        currentDisplayValue = currentDisplay.textContent;
        
        if(key.classList.contains("number")){
            if(currentDisplayValue === '0' || currentDisplay.textContent == 'Infinity' || currentDisplay.textContent == 'NaN'){
                currentDisplay.textContent = keyValue;
            }
            else{
                currentDisplay.textContent = currentDisplayValue + keyValue;
            }
        }
        
        if (key.classList.contains("decimal")) {
            if(currentDisplayValue.includes('.')){
                currentDisplay.textContent = currentDisplayValue;
            }
        } 

        if (key.classList.contains("operator")) {
            operator = keyValue;

            if(previousDisplay.textContent == ""){
                currentDisplayValue = currentDisplay.textContent;
                previousDisplayValue = currentDisplayValue;
                previousDisplay.textContent = previousDisplayValue + ' ' + operator;
                currentDisplay.textContent = '';
            }
            
            if(previousDisplay.textContent != "" && currentDisplay.textContent == ''){
                previousDisplayValue = previousDisplay.textContent.slice(0, -2);
                previousDisplay.textContent = previousDisplayValue + ' ' + operator;
            }
            
            if(previousDisplay.textContent != "" && currentDisplay.textContent != ''){
                currentDisplayValue = parseFloat(currentDisplayValue);
                previousDisplayValue = parseFloat(previousDisplay.textContent.slice(0, -2));
                previousOperator = previousDisplay.textContent.slice(-1);
                
                result = calculate(previousDisplayValue, currentDisplayValue, previousOperator);
                previousDisplay.textContent = result + ' ' + operator;
                currentDisplay.textContent = '';
            }
 
        }

        if (key.classList.contains("delete")) {
            if (currentDisplay.textContent == 'Infinity' || currentDisplay.textContent == 'NaN') {
                currentDisplay.textContent = '0';
            }else{
                currentDisplay.textContent = currentDisplayValue.slice(0, -1);
                if (currentDisplay.textContent == '' || currentDisplay.textContent == 'NaN') {
                    currentDisplay.textContent = '0';
                }else{
                    currentDisplay.textContent = currentDisplayValue.slice(0, -1);
                }
            }
            
        } 

        if (key.classList.contains("clear")) {
            currentDisplay.textContent = '0';
            previousDisplay.textContent = '';
        } 

        if (key.classList.contains("equal")) {
            if(currentDisplay.textContent == '' || previousDisplay.textContent == ''){
                currentDisplay.textContent = currentDisplay.textContent;
            }else{
                currentDisplayValue = parseFloat(currentDisplayValue);
            previousDisplayValue = parseFloat(previousDisplay.textContent.slice(0, -2));
            result = calculate(previousDisplayValue, currentDisplayValue, operator);
            currentDisplay.textContent = result;
            previousDisplay.textContent = '';
            operator = '';
            }
        } 
    })
})


function add(previousDisplayValue, currentDisplayValue){
    result = previousDisplayValue + currentDisplayValue;
    return result;
}

function subtract(previousDisplayValue, currentDisplayValue){
    result = previousDisplayValue - currentDisplayValue;
    return result;
}

function multiply(previousDisplayValue, currentDisplayValue){
    result = previousDisplayValue * currentDisplayValue;
    return result;
}

function divide(previousDisplayValue, currentDisplayValue){
    result = previousDisplayValue / currentDisplayValue;
    return result;
}

function calculate(previousDisplayValue, currentDisplayValue, operator){
    if(operator === '+'){
        result = add(previousDisplayValue, currentDisplayValue);
    }
    if(operator === '-'){
        result = subtract(previousDisplayValue, currentDisplayValue);
    }
    if(operator === '÷'){
        result = divide(previousDisplayValue, currentDisplayValue);
    }
    if(operator === '×'){
        result = multiply(previousDisplayValue, currentDisplayValue);
    }
    return result
}



