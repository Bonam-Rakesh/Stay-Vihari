require("dotenv").config();

const express = require("express");
const session = require("express-session");

const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listings");

const {
    connectDB
} = require("./config/db");

const {
    attachCurrentUser
} = require("./middleware");

const app = express();

const PORT = 8080;


// =========================
// VIEW ENGINE
// =========================

app.set("view engine", "ejs");


// =========================
// MIDDLEWARE
// =========================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// =========================
// SESSION
// =========================

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);


// =========================
// CURRENT USER
// =========================

app.use(attachCurrentUser);


// =========================
// ROUTES
// =========================

app.use("/users", userRoutes);

app.use("/listings", listingRoutes);


// =========================
// HOME
// =========================

app.get("/", (req, res) => {
    res.render("home");
});


// =========================
// ABOUT
// =========================

app.get("/about", (req, res) => {
    res.send(
        "Stay-Vihari is a travel stay and booking platform."
    );
});


// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).send(
        "Something went wrong. Please try again."
    );
});


// =========================
// START
// =========================

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(
                `Stay-Vihari server is running on http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "MongoDB connection failed:"
        );

        console.error(error.message);

        process.exit(1);
    }
}

startServer();