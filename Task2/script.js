document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                currentInput = '0';
                previousInput = '';
                operator = '';
                display.textContent = currentInput;
                return;
            }

            if (button.id === 'sqrt') {
                if (currentInput === '') return;
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                display.textContent = currentInput;
                return;
            }

            if (button.id === 'equals') {
                if (currentInput === '' || previousInput === '') return;
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
                previousInput = '';
                operator = '';
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '') return;
                if (previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                display.textContent = operator;
                return;
            }

            if (value === '%') {
                if (currentInput === '') return;
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
                return;
            }

            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
