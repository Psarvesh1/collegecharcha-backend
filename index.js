const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')


//import routes
const homeRoute = require('./routes/home')
const authRoute = require("./routes/auth");

dotenv.config();
//connect to db
mongoose.connect(process.env.DB_URL, () => console.log("connected to db"));

//middleware
app.use(express.json());

app.use(cors())

//route middlewares
app.use("/api/user", authRoute);
app.use("/api/home", homeRoute);

//listening to port
app.listen(3001, () => console.log("Server up and running"));
