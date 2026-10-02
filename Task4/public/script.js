const app = document.getElementById("app");

function navigateTo(page) {
    window.location.hash = page;
}

function loadPage() {
    const page = window.location.hash.substring(1) || "home";

    if (page === "register") {
        showRegisterPage();
    } else if (page === "about") {
        showAboutPage();
    } else {
        showHomePage();
    }
}

window.addEventListener("hashchange", loadPage);

window.addEventListener("DOMContentLoaded", loadPage);


function showHomePage() {

    app.innerHTML = `
        <div class="page">

            <div class="card hero">

                <h1>
                    Welcome to
                    <span class="highlight">Cognifyz</span>
                </h1>

                <p>
                    Task 4 demonstrates client-side routing,
                    dynamic DOM manipulation and advanced
                    form validation using JavaScript.
                </p>

                <div class="feature-grid">

                    <div class="feature">
                        <h3>🔀 Routing</h3>
                        <p>
                            Navigate between different
                            views without reloading the page.
                        </p>
                    </div>

                    <div class="feature">
                        <h3>⚡ Dynamic DOM</h3>
                        <p>
                            Page content is created and
                            updated dynamically using JavaScript.
                        </p>
                    </div>

                    <div class="feature">
                        <h3>🛡️ Validation</h3>
                        <p>
                            User input is checked using
                            multiple validation rules.
                        </p>
                    </div>

                </div>

                <button
                    class="primary-btn"
                    style="margin-top: 30px;"
                    onclick="navigateTo('register')"
                >
                    Start Registration
                </button>

            </div>

        </div>
    `;
}


function showRegisterPage() {

    app.innerHTML = `
        <div class="page">

            <div class="card">

                <h1>Registration Form</h1>

                <p>
                    Please enter your information below.
                    All fields are validated before submission.
                </p>

                <form id="registrationForm">

                    <div class="form-group">

                        <label for="name">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                        >

                        <span
                            class="error"
                            id="nameError"
                        ></span>

                    </div>


                    <div class="form-group">

                        <label for="email">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="example@email.com"
                        >

                        <span
                            class="error"
                            id="emailError"
                        ></span>

                    </div>


                    <div class="form-group">

                        <label for="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Create a strong password"
                        >

                        <span
                            class="error"
                            id="passwordError"
                        ></span>

                    </div>


                    <div class="form-group">

                        <label for="age">
                            Age
                        </label>

                        <input
                            type="number"
                            id="age"
                            placeholder="Enter your age"
                        >

                        <span
                            class="error"
                            id="ageError"
                        ></span>

                    </div>


                    <div class="form-group">

                        <label for="phone">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            id="phone"
                            placeholder="10 digit phone number"
                        >

                        <span
                            class="error"
                            id="phoneError"
                        ></span>

                    </div>


                    <div class="form-group">

                        <label for="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Re-enter your password"
                        >

                        <span
                            class="error"
                            id="confirmPasswordError"
                        ></span>

                    </div>


                    <button
                        type="submit"
                        class="primary-btn"
                    >
                        Submit Registration
                    </button>

                </form>

            </div>

        </div>
    `;

    const form =
        document.getElementById("registrationForm");

    form.addEventListener("submit", validateForm);
}




function validateForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const age =
        document.getElementById("age").value;

    const phone =
        document.getElementById("phone").value.trim();


    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const confirmPasswordError =
        document.getElementById("confirmPasswordError");

    const ageError =
        document.getElementById("ageError");

    const phoneError =
        document.getElementById("phoneError");


    // Clear previous errors

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    ageError.textContent = "";
    phoneError.textContent = "";


    let isValid = true;


    /* Name validation */

    if (name === "") {

        nameError.textContent =
            "Name is required.";

        isValid = false;

    } else if (name.length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        isValid = false;

    } else if (!/^[A-Za-z ]+$/.test(name)) {

        nameError.textContent =
            "Name can contain only letters and spaces.";

        isValid = false;
    }


    /* Email validation */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent =
            "Email is required.";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Enter a valid email address.";

        isValid = false;
    }


    /* Password validation */

    if (password === "") {

        passwordError.textContent =
            "Password is required.";

        isValid = false;

    } else if (password.length < 8) {

        passwordError.textContent =
            "Password must contain at least 8 characters.";

        isValid = false;

    } else if (!/[A-Z]/.test(password)) {

        passwordError.textContent =
            "Password must contain at least one uppercase letter.";

        isValid = false;

    } else if (!/[a-z]/.test(password)) {

        passwordError.textContent =
            "Password must contain at least one lowercase letter.";

        isValid = false;

    } else if (!/[0-9]/.test(password)) {

        passwordError.textContent =
            "Password must contain at least one number.";

        isValid = false;
    }


    /* Confirm password */

    if (confirmPassword === "") {

        confirmPasswordError.textContent =
            "Please confirm your password.";

        isValid = false;

    } else if (password !== confirmPassword) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        isValid = false;
    }


    /* Age validation */

    const ageNumber = Number(age);

    if (age === "") {

        ageError.textContent =
            "Age is required.";

        isValid = false;

    } else if (
        !Number.isInteger(ageNumber) ||
        ageNumber < 18 ||
        ageNumber > 100
    ) {

        ageError.textContent =
            "Age must be a whole number between 18 and 100.";

        isValid = false;
    }


    /* Phone validation */

    if (phone === "") {

        phoneError.textContent =
            "Phone number is required.";

        isValid = false;

    } else if (!/^[0-9]{10}$/.test(phone)) {

        phoneError.textContent =
            "Phone number must contain exactly 10 digits.";

        isValid = false;
    }


    /* Result */

    if (isValid) {

        showSuccessPage(
            name,
            email,
            ageNumber,
            phone
        );
    }
}




function showSuccessPage(
    name,
    email,
    age,
    phone
) {

    app.innerHTML = `
        <div class="page">

            <div class="card success-box">

                <div class="success-icon">
                    🎉
                </div>

                <h1>
                    Registration Successful!
                </h1>

                <p>
                    Your information passed all
                    validation checks.
                </p>

                <div class="user-details">

                    <p>
                        <strong>Name:</strong>
                        ${escapeHTML(name)}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${escapeHTML(email)}
                    </p>

                    <p>
                        <strong>Age:</strong>
                        ${age}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${escapeHTML(phone)}
                    </p>

                </div>

                <button
                    class="primary-btn"
                    style="margin-top: 20px;"
                    onclick="navigateTo('home')"
                >
                    Back to Home
                </button>

            </div>

        </div>
    `;
}


function showAboutPage() {

    app.innerHTML = `
        <div class="page">

            <div class="card">

                <h1>
                    About Task 4
                </h1>

                <p>
                    This project demonstrates several
                    advanced client-side JavaScript
                    concepts.
                </p>

                <ul class="about-list">

                    <li>
                        Client-side routing using URL hashes
                    </li>

                    <li>
                        Dynamic DOM manipulation
                    </li>

                    <li>
                        Complex form validation
                    </li>

                    <li>
                        Password strength validation
                    </li>

                    <li>
                        Confirmation password checking
                    </li>

                    <li>
                        Responsive CSS design
                    </li>

                </ul>

                <button
                    class="primary-btn"
                    style="margin-top: 20px;"
                    onclick="navigateTo('register')"
                >
                    Try Registration
                </button>

            </div>

        </div>
    `;
}

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}