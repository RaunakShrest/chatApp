const e = require("express");
const asyncHandler= require("express-async-handler");
const { off } = require("../models/userModel");
const User = require("../models/userModel");
const generateToken= require("../config/generateToken")
const registerUser =asyncHandler(async(req,res)=>{
const{name, email, password, pic}= req.body;


if(!name || !email|| !password){
    res.status(400);
    throw new Error("Please enter all the fields")
}
const userExists= await User.findOne({email})

if(userExists){
    res.status(400);
    throw new Error("User already exists")
}

const user= await User.create({
    name,
    email,
    password,
    pic,
})
if(user){
    res.status(201).json({ 
        //.201= success
        _id: user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)

    })
} else{
    res.status(400)
    throw new Error("User Failed to create ")
}
})
module.exports={registerUser};