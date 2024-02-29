const userDB = require("../models/userModel");
const JWT = require("jsonwebtoken");

const userauthenticate = async(req,res,next) =>{
    try {
        const token = req.headers.authorization;
        
        const verifytoken = JWT.verify(token,process.env.SECRET);
        const rootUser = await userDB.findOne({_id:verifytoken._id}); 
        if(!rootUser){
            throw new Error("User not found");
        }
        req.token = token;
        req.user = rootUser;
        req.userId = rootUser._id;
        req.userMainId = rootUser.id;
        next();
    } catch (error) {
        res.status(400).json({error:"Unautherized no token provide"})
    }
}

module.exports = userauthenticate;