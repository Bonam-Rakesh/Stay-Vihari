const { ObjectId } = require("mongodb");

const { getDB } = require("../config/db");

function usersCollection() {
    return getDB().collection("users");
}

async function findByUsername(username) {
    return usersCollection().findOne({
        username: username.trim().toLowerCase()
    });
}

async function findByEmail(email) {
    return usersCollection().findOne({
        email: email.trim().toLowerCase()
    });
}

async function findById(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return usersCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createUser({ username, email, passwordHash }) {
    const now = new Date();

    const user = {
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        passwordHash,
        createdAt: now,
        updatedAt: now
    };

    const result = await usersCollection().insertOne(user);

    return {
        ...user,
        _id: result.insertedId
    };
}

module.exports = {
    findByUsername,
    findByEmail,
    findById,
    createUser
};