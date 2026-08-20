const express = require("express");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.send("Welcome to Stay-Vihari!");
});

app.get("/about", (req, res) => {
    res.send("Stay-Vihari is a travel stay and booking platform.");
});

app.listen(PORT, () => {
    console.log(`Stay-Vihari server is running on http://localhost:${PORT}`);
});