const { json } = require("express");
const asyncHandler =require("express-async-handler");
const User = require("../models/userModel")
const generateToken =require ('../config/generateToken')

const registerUser =asyncHandler(async( req,res) => {
    const { name,email,password,pic } = req.body;


    if (!name ||!email||!password) {
        res.status(400)
        throw new Error("Please Enter all the fields");
    }


    const userExist = await User.findOne({email});
    if (userExist) {
        res.status(400)
        throw new Error("User already exist");
    }


    const user = await User.create ({
        name,
        email,
        password,
        pic,
    });

    if(user) {
        res.status(201).json({

            id:user._id,
            name:user,name,
            emaul:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }else{


        res.status(400);
        throw new Erroor ("Failed to create the user");
    }


});



const authUser = asyncHandler(async (req,res)=>{
    const {email,password} =req.body;


    const user = await User.findOne ({email});


    if(user && (await user.matchPaassword(password))) {
        res.json({
            id:user._id,
            name:user,name,
            emaul:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }
    else{

        res.status(401)
        throw new Error("Inavalid Username or Password");
    }


}
)

module.exports ={registerUser,authUser};