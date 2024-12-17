document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Error display elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Validation functions
    function validateName(name) {
        return name.length >= 3;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (!validateName(this.value)) {
            nameError.style.display = 'block';
            nameError.textContent = 'Name must be at least 3 characters long';
        } else {
            nameError.style.display = 'none';
        }
    });

    emailInput.addEventListener('input', function() {
        if (!validateEmail(this.value)) {
            emailError.style.display = 'block';
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.style.display = 'none';
        }
    });

    passwordInput.addEventListener('input', function() {
        if (!validatePassword(this.value)) {
            passwordError.style.display = 'block';
            passwordError.textContent = 'Password must be at least 8 characters long';
        } else {
            passwordError.style.display = 'none';
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (!validateConfirmPassword(passwordInput.value, this.value)) {
            confirmPasswordError.style.display = 'block';
            confirmPasswordError.textContent = 'Passwords do not match';
        } else {
            confirmPasswordError.style.display = 'none';
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);
        const isConfirmPasswordValid = validateConfirmPassword(
            passwordInput.value, 
            confirmPasswordInput.value
        );

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // Create user object
            const user = {
                fullName: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };

            // Store user data in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            // Show success modal
            $('#successModal').modal('show');

            // Reset form
            form.reset();
        }
    });
});