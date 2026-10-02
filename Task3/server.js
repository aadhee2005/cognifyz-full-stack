const express = require("express");

const app = express();
const PORT = 3002;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Task 3 server running at http://localhost:${PORT}`);
});