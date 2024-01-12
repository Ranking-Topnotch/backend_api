const mongoose = require('mongoose')

//have all the value we want in the contact
const numberSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, //this is a inbluit id
        required: true,
        ref: "user"
    },
    name:{
        type: String,
        required: [true, 'This section is required']
    },

    email:{
        type: String,
        required: [true, 'This section is required']
    },

    phone:{
        type: String,
        required: [true, 'This section is required']
    },
}, {
    timestamps:  true
})

module.exports = mongoose.model("Number", numberSchema)