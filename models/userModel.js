const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   username: {
        type: String,
        required: [true, "Fill in your name"]
   } ,
   email: {
        type: String,
        required: [true, "Fill in your email address"],
        unique: [true, "Email address already taken"]
   },
   password: {
        type: String,
        required: [true, "Fill in your password"]
}
}, {
    timestamp: true
})

module.exports = mongoose.model("User", userSchema)