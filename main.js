document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;

    const contactForm = document.querySelector('.contact-form form');
    const formStatusMessage = document.getElementById('form-status-message');

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

    // Form submission handler
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;
        const formData = new FormData(form);
        const url = form.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatusMessage.textContent = '문의가 성공적으로 제출되었습니다!';
                formStatusMessage.style.color = 'green';
                form.reset(); // Clear form fields
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatusMessage.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    formStatusMessage.textContent = '문의 제출에 실패했습니다. 다시 시도해주세요.';
                }
                formStatusMessage.style.color = 'red';
            }
        } catch (error) {
            formStatusMessage.textContent = '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
            formStatusMessage.style.color = 'red';
            console.error('Form submission error:', error);
        }
        // Clear message after a few seconds
        setTimeout(() => {
            formStatusMessage.textContent = '';
        }, 5000);
    });


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
