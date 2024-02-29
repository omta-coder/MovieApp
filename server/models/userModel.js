const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")

//user Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email Address');
            }    
        }
    },
    password:{
        type:String,
        require:true,
    },
    tokens:[{
        token:{
            type:String,
        }
    }]
},{timestamps:true});

//hash password
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
});

//model
const userDB = new mongoose.model("users", userSchema);
module.exports = userDB;