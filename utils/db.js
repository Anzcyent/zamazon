const mongoose = require('mongoose');
const winston = require('winston');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("DB connected");
        return "DB connected";
    } catch (err) {
        winston.log("info", err.message);
        throw new Error(err);
    }
}

module.exports = connectDB;