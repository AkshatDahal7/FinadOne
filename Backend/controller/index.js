console.log("controller Loaded")
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/index');

// const jwt = require('jsonwebtoken');

const registerHandler = async(req,res) =>{
        try{
            const {fname , lname, email,password} = req.body
    
            const existingUser = await User.findOne({email})
            if(existingUser){
                return res.status(400).json({msg: "Email already exists!"})
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = new User({fname , lname, email,password: hashedPassword})
            await newUser.save();
            res.status(201).json({msg:"User created successfully"})
        }
        catch(error){
            console.log("in register")
            console.log(error);
        }
    }

    const loginHandler = async(req,res) =>{
        try{
                const {email,password} = req.body
                const user = await User.findOne({email})
                if(!user){
                    return res.status(400).json({message : "Email not found!"})
                }
                const isMatch = await bcrypt.compare(password,user.password)
                if(!isMatch){
                    return res.status(400).json({message : "Incorrect password!"})
                }
                res.status(200).json({
                    message : "User Logged in successfully!",
                    user : {fname : user.fname , lname : user.lname , email : user.email}
            })
            }
            catch(error){
                console.log(error);
            }
        }

module.exports = {registerHandler,loginHandler};