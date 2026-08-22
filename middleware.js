const { findById } = require("./repositories/users");

async function attachCurrentUser(req, res, next) {
    try {
        res.locals.currentUser = null;

        if (!req.session.userId) {
            return next();
        }

        const user = await findById(req.session.userId);

        if (user) {
            res.locals.currentUser = user;
        }

        next();
    } catch (error) {
        next(error);
    }
}

function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/users/login");
    }

    next();
}

module.exports = {
    attachCurrentUser,
    requireLogin
};