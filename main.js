document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;

    generateButton.addEventListener('click', generateLottoNumbers);
    themeToggleButton.addEventListener('click', toggleTheme);

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggleButton.textContent = savedTheme === 'dark-mode' ? '라이트 모드' : '다크 모드';
    } else {
        // Default to light mode if no theme is saved
        body.classList.add('light-mode');
        themeToggleButton.textContent = '다크 모드';
    }


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

    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            themeToggleButton.textContent = '다크 모드';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            themeToggleButton.textContent = '라이트 모드';
            localStorage.setItem('theme', 'dark-mode');
        }
    }
});
