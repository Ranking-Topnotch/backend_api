//npm install bcpyt
//npm install jsonwebtoken
const asyncHandler = require("express-async-handler")
const credential = require("../models/userModel")        
const bcrypt = require("bcrypt") // use to hash password
const jwt = require("jsonwebtoken")
//register a user
    //route post /api/users/register
        //access public
const registerUser = asyncHandler(async (req, res) =>{
    const {username, email, password } = req.body
    if(!username || !email || !password){
       res.status(400) 
       throw new Error('All fields are mandatory')
    }
    const userCre = await credential.findOne({email})

    if(userCre){
        res.status(400)
        throw new Error('Email already registerd!')
    }

    //hash password
    const hidepassword = await bcrypt.hash(password, 10);
    console.log(hidepassword)

    const user = await credential.create({ //creating the new user. Replacing the the password with the hashpassword
        username,
        email,
        password: hidepassword
    })

    console.log("User is credential")

    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error('Request not valid')
    }


    res.json({message: 'Register the User'})
})

const loginUser = asyncHandler(async (req, res) =>{
    const {email, password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error('Request not valid')
    }

    //check if the user email already exist in the database
    const user = await credential.findOne({email})

    //comaparing the password with hash password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        ) 
        res.status(200).json({accessToken})
    }else{
       res.status(401) 
       throw new Error('Wrong email or password')
    }
})

const currentUser = asyncHandler(async (req, res) =>{
    res.json(req.user);
})

module.exports = { registerUser, loginUser, currentUser }