const express = require("express")
const connectDB = require("./config/db")
const routes = require('./routes/index')
require('dotenv').config();

const app = express();
app.use(express.json())

connectDB();


app.use('/',routes)
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

