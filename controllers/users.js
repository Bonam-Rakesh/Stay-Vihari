const bcrypt = require("bcrypt");

const {
    findByUsername,
    findByEmail,
    createUser
} = require("../repositories/users");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};


module.exports.signupUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send("All fields are required.");
        }

        if (password.length < 6) {
            return res
                .status(400)
                .send("Password must be at least 6 characters.");
        }

        const existingUsername = await findByUsername(username);

        if (existingUsername) {
            return res.status(400).send("Username already exists.");
        }

        const existingEmail = await findByEmail(email);

        if (existingEmail) {
            return res.status(400).send("Email already registered.");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await createUser({
            username,
            email,
            passwordHash
        });

        req.session.userId = user._id.toString();

        res.redirect("/");
    } catch (error) {
        next(error);
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};


module.exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Username and password are required.");
        }

        const user = await findByUsername(username);

        if (!user) {
            return res.status(401).send("Invalid username or password.");
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).send("Invalid username or password.");
        }

        req.session.userId = user._id.toString();

        res.redirect("/");
    } catch (error) {
        next(error);
    }
};


module.exports.logoutUser = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.redirect("/");
    });
};