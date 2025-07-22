document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }

    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
    const form = document.getElementById('prediction-form');
    const resultElement = document.getElementById('result');
    const formErrorMessage = document.getElementById('form-error-message');

    const inputs = {
        age: document.getElementById('age'),
        gender: document.getElementById('gender'),
        bmi: document.getElementById('bmi'),
        children: document.getElementById('children'),
        smoker: document.querySelectorAll('input[name="smoker"]'),
        region: document.getElementById('region')
    };

    const showError = (input, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.innerText = message;
        }
    };

    const showRadioError = (radioInputs, message) => {
        const formGroup = radioInputs[0].closest('.form-group');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.innerText = message;
        }
    };

    const hideError = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.innerText = '';
        }
    };

    const hideRadioError = (radioInputs) => {
        const formGroup = radioInputs[0].closest('.form-group');
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.innerText = '';
        }
    };

    const validateForm = () => {
        let isValid = true;
        formErrorMessage.style.display = 'none';

        // Age
        if (!inputs.age.value || parseInt(inputs.age.value) <= 0) {
            showError(inputs.age, 'Age must be greater than 0');
            isValid = false;
        } else {
            hideError(inputs.age);
        }

        // Gender
        if (inputs.gender.value === "") {
            showError(inputs.gender, 'Please select a gender');
            isValid = false;
        } else {
            hideError(inputs.gender);
        }

        // BMI
        if (!inputs.bmi.value || parseFloat(inputs.bmi.value) <= 10) {
            showError(inputs.bmi, 'BMI must be greater than 10');
            isValid = false;
        } else {
            hideError(inputs.bmi);
        }

        // Number of Children
        if (inputs.children.value === "" || parseInt(inputs.children.value) < 0) {
            showError(inputs.children, 'Number of children must be 0 or more');
            isValid = false;
        } else {
            hideError(inputs.children);
        }

        // Smoker
        const smokerValue = document.querySelector('input[name="smoker"]:checked');
        if (!smokerValue) {
            showRadioError(inputs.smoker, 'Please select smoker status');
            isValid = false;
        } else {
            hideRadioError(inputs.smoker);
        }

        // Region
        if (inputs.region.value === "") {
            showError(inputs.region, 'Please select a region');
            isValid = false;
        } else {
            hideError(inputs.region);
        }

        return isValid;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Placeholder result
            resultElement.innerText = '$12,345.67'; 
            formErrorMessage.style.display = 'none';
        } else {
            resultElement.innerText = '$---';
            formErrorMessage.innerText = 'Invalid input. Please correct the highlighted fields.';
            formErrorMessage.style.display = 'block';
        }
    });
    Object.values(inputs).forEach(input => {
        if (Array.isArray(input) || input instanceof NodeList) { // Handle radio buttons as a group
             inputs.smoker.forEach(radio => {
                radio.addEventListener('change', () => {
                    if (document.querySelector('input[name="smoker"]:checked')) {
                        hideRadioError(inputs.smoker);
                    }
                });
            });
        } else {
            input.addEventListener('input', () => {
                 validateForm(); // Re-validate on input
            });
        }
    });
});
