const jwt  = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const verifyToken = async(req,res,next)=>{

    const authHeader = req.header('Authorization');

    if(!authHeader){
        return res.status(401).json({message : "Access token (header) missing!"})
    }
    const token = authHeader.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({message : " Token missing!"})
    }

    try{
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
    }
    catch(error){
        return res.status(400).json({message : "Invalid token!"})
        
    }
}

module.exports = verifyToken;