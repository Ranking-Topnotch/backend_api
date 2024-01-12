const express = require('express')
const errorHandler = require('./middleware/errorHandler') //error handler
//const { connect } = require('mongoose')
const connectDB = require('./config/dbConnection') //connecting to mongodb
const dotenv = require('dotenv').config()

connectDB()
const app = express()
const port = process.env.PORT || 8000

app.use(express.json()) //converting to json
app.use('/api/contacts', require('./routes/contactRoute'))
app.use('/api/users', require('./routes/usersRoute')) 
app.use(errorHandler) // error

app.listen(port, ()=>{
    console.log(port)
})

