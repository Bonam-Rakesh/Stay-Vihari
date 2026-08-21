const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/user");
require("dotenv").config();

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);

app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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