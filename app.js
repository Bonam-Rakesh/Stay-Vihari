const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Stay-Vihari!");
});

app.get("/about", (req, res) => {
    res.send("Stay-Vihari is a travel stay and booking platform.");
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(
                `Stay-Vihari server is running on http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

startServer();