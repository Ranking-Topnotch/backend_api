const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


//whenever a user is passing a reques, it is usually pass in the header
const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHead = req.headers.Authorization || req.headers.authorization
    if(authHead && authHead.startsWith("Bearer")){
        token = authHead.split(" ")[1] //extracting the token that start with bearer
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401)
                throw new Error('User is not authorize')
            }
            req.user = decoded.user
            next()
        })
        
        if(!token){
            res.status(401)
            throw new Error('User is not authorize')
        }
    }
}) 

module.exports = validateToken