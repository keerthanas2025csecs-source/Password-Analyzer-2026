const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", checkPassword);

function checkPassword() {

    const password = passwordInput.value;

    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    let score = 0;

    const labels = {
        length: "At least 8 characters",
        upper: "One uppercase letter",
        lower: "One lowercase letter",
        number: "One number",
        special: "One special character"
    };

    for (let key in checks) {

        const element = document.getElementById(key);

        if (checks[key]) {
            score++;
            element.innerHTML = "✅ " + labels[key];
        } else {
            element.innerHTML = "❌ " + labels[key];
        }
    }

    const bar = document.getElementById("strength");
    const result = document.getElementById("result");
    const suggestion = document.getElementById("suggestion");

    bar.style.width = (score * 20) + "%";

    if (password.length === 0) {

        result.innerHTML = "Password Strength: Not Checked";
        bar.style.width = "0%";
        suggestion.innerHTML = "";

    } else if (score <= 2) {

        result.innerHTML = "Password Strength: Weak";
        bar.style.background = "red";
        suggestion.innerHTML =
            "Add uppercase letters, numbers and special characters.";

    } else if (score <= 4) {

        result.innerHTML = "Password Strength: Medium";
        bar.style.background = "orange";
        suggestion.innerHTML =
            "Add more variety to make your password stronger.";

    } else {

        result.innerHTML = "Password Strength: Strong";
        bar.style.background = "green";
        suggestion.innerHTML =
            "Great! All basic requirements are satisfied.";
    }
}

function togglePassword() {

    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
}

function generatePassword() {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";

    let password = "";

    const array = new Uint32Array(16);

    crypto.getRandomValues(array);

    for (let i = 0; i < 16; i++) {

        password += chars[array[i] % chars.length];
    }

    passwordInput.value = password;

    checkPassword();
}