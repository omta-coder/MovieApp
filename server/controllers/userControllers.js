const userDB = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//user register
exports.register = async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
       res.status(400).send({error:'Missing fields'});
    }else{
        try {
            const existingUser = await userDB.findOne({email:email});
            if(existingUser){
                res.status(400).json( { error : 'Email is already in use.' });
            }else{
                const userData = new userDB({
                    username,email,password
                });
                //password hashing
                await userData.save();
                res.status(200).json({message:"User created successfully!"})
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

//user login
exports.login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).send({error:'Missing fields'});
    }else{
        try {
            const userValid = await userDB.findOne({email:email});
            if(userValid){
            const isMatch = await  bcrypt.compare(password,userValid.password);
            if(!isMatch){
              res.status(400).json({error:"Invalid Details"})
            }else{
                //generate token
                const token = JWT.sign({_id:userValid._id},process.env.SECRET,{
                     expiresIn: "1d"
                });
                userValid.tokens = {token};
                await userValid.save();
                res.status(200).json({message:"User Successfully Login",token})
            }
            }else{
                res.status(400).json({error:"User Not Exist"})
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
}