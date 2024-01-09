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

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// for id you write req.params but for query you write req.query
const allUsers= asyncHandler(async(req,res)=>{
  const keyword= req.query.search ?{
    $or:[
      {name:{$regex:req.query.search, $options: "i"}},
      {email:{$regex:req.query.search, $options: "i"}},
    ]
  }  //above lines means its either searching inside of name or email if any of the queries match then its gonna retrun it
:{} // else we are not gonna do anything

 const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
})
module.exports={registerUser, authUser, allUsers};