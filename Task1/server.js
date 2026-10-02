const express = require("express");

const app = express();
const PORT = 3000;

// Use EJS as the template engine
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;

    console.log("Form submitted:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Age:", age);

    res.render("success", {
        name: name,
        email: email,
        age: age
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});