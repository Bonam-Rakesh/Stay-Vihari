const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let database = null;


// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();

        await client.db("admin").command({
            ping: 1
        });

        database = client.db("stay_vihari");

        console.log("Connected to MongoDB with native driver");

        return database;

    } catch (error) {

        console.error("MongoDB connection failed:");
        console.error(error.message);

        throw error;
    }
}


// Get the connected database
function getDB() {

    if (!database) {
        throw new Error(
            "Database has not been connected yet."
        );
    }

    return database;
}


module.exports = {
    connectDB,
    getDB
};