
const mongoose = require('mongoose');
const ErrorHandler = require('./ErrorCLass');
require("dotenv").config()
//Set up default mongoose connection
const mongoDB_Url = process.env.MONGODB_URL;

async function connectDB() {
    try {
        let connect = await mongoose.connect(mongoDB_Url);
        console.log(connect.connection.host)
    } catch (error) {
        throw new ErrorHandler(error.status, error.message)
    }
}
module.exports = connectDB