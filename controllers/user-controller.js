const User = require('../models/user.js')

const bcrypt = require('bcrypt');
const { createToken } = require("../utilis/token-manager");
const { COOKIE_NAME } = require("../utilis/constants");

exports.getAllUsers = async (req,res,next) => {
    //Get All Users
    try{
        const users = await User.find();
        return res.status(200).json({message:"Ok",users});
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR",cause:err.message});
    }
};

exports.userSignup = async (req, res, next) => {
    //User Signup
    try{
      const {name,email,password} = req.body;
      const existingUser = await User.findOne({email});
      if(existingUser) return res.status(401).send("User already registered");
      const hashedPassword = await bcrypt.hash(password,10);
      const user = new User({name,email,password:hashedPassword});
      await user.save();

      //Create Token And Store Cookie
      //First Remove If There Are Any Existing Cookies
      res.clearCookie('auth-token',{
        httpOnly: true,
      });
      //Create A New JWT Token For This User
      const token = await createToken(user._id.toString(),user.email);
      const expires = new Date();
      expires.setDate(expires.getDate()+7); //as our token will also expire after 7days and so should our cookie
      res.cookie('auth-token',token,{
        expires,
        httpOnly: true,
      });
      return res.status(201).json({message:"Ok", name:user.name, email:user.email});
    }catch(err){
      console.log(err);
      return res.status(404).json({message:"ERROR",cause:err.message});
    }
};

exports.userLogin = async (req,res,next) => {
    //User Login
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(401).send("User not registered");
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(403).send("Incorrect Password");
        
        //Create Token And Store Cookie
        //First Remove If There Are Any Existing Cookies
        res.clearCookie('auth-token',{
          httpOnly: true,
        });
        //Create A New JWT Token For This User
        const token = await createToken(user._id.toString(),user.email);
        const expires = new Date();
        expires.setDate(expires.getDate()+7); //as our token will also expire after 7days and so should our cookie
        res.cookie('auth-token', token, {
          httpOnly: true, // Only accessible via HTTP, not JavaScript
          secure: true, // Only send cookie over HTTPS
          sameSite: 'None', // Required for cross-site cookies
        });
        
        return res.status(200).json({message:"Ok", name:user.name, email:user.email});
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"ERROR",cause:err.message});
    }
};

exports.verifyUser = async (req,res,next) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

exports.userLogout = async (req,res,next) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      res.clearCookie('auth-token',{
        httpOnly: true,
      });
      return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};