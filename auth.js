(function () {
    var emailKey = 'educationCityUserEmail';

    function getEmail() {
        return window.localStorage.getItem(emailKey) || '';
    }

    var loginForm = document.querySelector('[data-login-form]');
    if (loginForm) {
        var savedEmail = getEmail();
        var loginEmail = loginForm.querySelector('[name="email"]');
        if (savedEmail && loginEmail) {
            loginEmail.value = savedEmail;
        }

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var email = loginEmail.value.trim();
            var password = loginForm.querySelector('[name="password"]').value;
            var message = loginForm.querySelector('.auth-note');

            if (!email || !password) {
                message.textContent = 'Please enter an email and password to continue.';
                return;
            }

            window.localStorage.setItem(emailKey, email);
            window.location.href = 'dashboard.html';
        });
    }

    var signupForm = document.querySelector('[data-signup-form]');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var email = signupForm.querySelector('[name="email"]').value.trim();
            var password = signupForm.querySelector('[name="password"]').value;
            var confirmPassword = signupForm.querySelector('[name="confirm-password"]').value;
            var message = signupForm.querySelector('.auth-note');

            if (!email || !password || !confirmPassword) {
                message.textContent = 'Please complete all fields to continue.';
                return;
            }
            if (password !== confirmPassword) {
                message.textContent = 'Passwords do not match.';
                return;
            }

            window.localStorage.setItem(emailKey, email);
            window.location.href = 'login.html';
        });
    }

    var dashboardEmails = document.querySelectorAll('[data-dashboard-email]');
    if (dashboardEmails.length) {
        dashboardEmails.forEach(function (dashboardEmail) {
            dashboardEmail.textContent = getEmail() || 'Guest learner';
        });
    }

    var logoutLink = document.querySelector('[data-logout]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function () {
            window.localStorage.removeItem(emailKey);
        });
    }
})();
