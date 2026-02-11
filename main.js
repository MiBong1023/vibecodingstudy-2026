document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const lottoNumbersDiv = document.getElementById('lotto-numbers');

    generateButton.addEventListener('click', generateLottoNumbers);

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        lottoNumbersDiv.innerHTML = ''; // Clear previous numbers
        sortedNumbers.forEach(number => {
            const span = document.createElement('span');
            span.textContent = number;
            span.classList.add('lotto-number');
            lottoNumbersDiv.appendChild(span);
        });
    }
});
