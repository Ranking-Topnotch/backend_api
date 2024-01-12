const asyncHandler = require("express-async-handler") //a dependecy use in handling eror.
const number = require('../models/contactModel') // this is the schema that contain all the properties of the database

const getContact = asyncHandler(async (req, res)=>{
    const numbers =  await number.find({user_id: req.user.id}); //request number base on the user that is signed IN
    res.status(200).json(numbers)
})

const getContactById = asyncHandler(async (req, res)=>{
    const numberById = await number.findById(req.params.id)

    if(!numberById){
        res.status(404)
        throw new Error("Contact by Id")
    }
    res.status(200).json(numberById)
})

const postContact = asyncHandler(async (req, res)=>{ //create new contact
    const { name, email, phone } = req.body
    //if there is no name, email, phone throw an error
    if(!name || !email || !phone){ 
        res.status(400, 'Error at line 13')
        throw new Error('Kindly fill all field')
    }
    const postnumber = await number.create({ //creating the new contact
        name,
        email,
        phone,
        user_id: req.user.id
    }) 
    res.status(201).json(postnumber)
})

const putContact = asyncHandler(async (req, res)=>{ //updating contact
    const update = await number.findById(req.params.id)//the id that you want to update. the one in the query
    if(!update){
        res.status(400, 'Error at line 13')
        throw new Error('Kindly fill all field')
    }

    //check if the user that want to edit the contact is same user that have the contact
    if(update.user_id.toString() !== req.user.id){
       res.status(403)
        throw new Error("User not permitted to update this number")
    }
    const updateContact = await number.findByIdAndUpdate( //updating the contact 'findByIdAndUpdatea
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(updateContact)
})

const deleteContact = asyncHandler(async (req, res)=>{
    const deleted = await number.findById(req.params.id)
    if(!deleted){
        res.status(404, 'Error at line 13')
        throw new Error('Kindly fill all field')
    }

    //check if the user that want to edit the contact is same user that have the contact
    if(deleted.user_id.toString() !== req.user.id){
        res.status(403)
         throw new Error("User not permitted to update this number")
     }

    await deleted.deleteOne({_id: req.params.id})



     //arternative way
    // const deletContact = await number.findByIdAndUpdate(
    //     req.params.body,
    //     '',
    //     {new: true},
    //     console.log('deleted')
    // )

    

    res.status(200).json(deleted)
})

module.exports = { getContact, getContactById, postContact, putContact, deleteContact }