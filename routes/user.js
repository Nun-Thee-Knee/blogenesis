const express = require("express");
const User = require("../models/user")
const router = express.Router();

router.get("/signin", (req, res)=>{
    return res.render('signin');
})

router.get("/signup", (req, res)=>{
    return res.render('signup');
})

router.post("/signup", async(req,res)=>{
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/");
})

router.post("/signin", async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);
    console.log(user);
    res.redirect("/");
})

module.exports = router;