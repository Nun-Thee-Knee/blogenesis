const express = require("express");
const path = require("path")
const User = require("./models/user")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const app = express();
const PORT = 8000 || process.env.PORT;
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./models/blog");

//middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve("./public")))

//DB Connection
mongoose.connect('mongodb://localhost:27017/blogenesis')
.then((e)=>{console.log("MongoDb is connected")});

//Router
app.get("/", async(req, res)=>{
    const allBlogs = await Blog.find()
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})