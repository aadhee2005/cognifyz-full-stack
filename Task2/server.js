const express = require("express");

const app = express();
const PORT = 3001;

// Temporary server-side storage
const registrations = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password;
    const age = req.body.age;
    const phone = req.body.phone?.trim();
    const gender = req.body.gender;

    const skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills
            ? [req.body.skills]
            : [];

    // Server-side validation
    if (!name || name.length < 3) {
        return res.status(400).send("Invalid name. Name must contain at least 3 characters.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
        return res.status(400).send("Invalid email address.");
    }

    if (!password || password.length < 8) {
        return res.status(400).send("Password must contain at least 8 characters.");
    }

    const ageNumber = Number(age);

    if (!age || ageNumber < 18 || ageNumber > 100) {
        return res.status(400).send("Age must be between 18 and 100.");
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phone || !phonePattern.test(phone)) {
        return res.status(400).send("Phone number must contain exactly 10 digits.");
    }

    const allowedGenders = ["Male", "Female", "Other"];

    if (!allowedGenders.includes(gender)) {
        return res.status(400).send("Please select a valid gender.");
    }

    const allowedSkills = ["HTML", "CSS", "JavaScript", "Node.js"];

    if (
        skills.length === 0 ||
        skills.some(skill => !allowedSkills.includes(skill))
    ) {
        return res.status(400).send("Please select at least one valid skill.");
    }

    // Temporary storage
    const registration = {
        id: registrations.length + 1,
        name,
        email,
        age: ageNumber,
        phone,
        gender,
        skills
    };

    registrations.push(registration);

    console.log("Registration stored temporarily:");
    console.log(registration);

    res.render("success", {
        registration
    });
});

// View temporarily stored registrations
app.get("/registrations", (req, res) => {
    res.json(registrations);
});

// Start server
app.listen(PORT, () => {
    console.log(`Task 2 server running at http://localhost:${PORT}`);
});