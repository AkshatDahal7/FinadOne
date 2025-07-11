const { default: mongoose } = require("mongoose");
require('dotenv').config();
const connectDB = async()=>{

    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = connectDB;