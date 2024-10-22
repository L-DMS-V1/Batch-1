function toggleMenu() {
    alert("Menu button clicked");
}

document.getElementById("signupBtn").addEventListener("click", function() {
    showSignupSection();
});

document.getElementById("loginBtn").addEventListener("click", function() {
    showLoginSection();
});

function showLoginSection() {
    document.getElementById("welcomeSection").style.display = "none";
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("loginSection").style.display = "flex";
}

function showSignupSection() {
    document.getElementById("welcomeSection").style.display = "none";
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signupSection").style.display = "flex";
}

function showWelcomeSection() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("welcomeSection").style.display = "flex";
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Login form submitted");
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Signup form submitted");
});

document.getElementById("showPassword").addEventListener("change", function() {
    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    if (this.checked) {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
});
