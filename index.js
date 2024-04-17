const express = require("express");
const path = require("path")
const User = require("./models/user")
const mongoose = require("mongoose")

const app = express();
const PORT = 8000 || process.env.PORT;
const userRoute = require("./routes/user")

//middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//DB Connection
mongoose.connect('mongodb://localhost:27017/blogenesis')
.then((e)=>{console.log("MongoDb is connected")});

//Router
app.get("/", (req, res)=>{
    res.render("home")
})
app.use("/user", userRoute);

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})