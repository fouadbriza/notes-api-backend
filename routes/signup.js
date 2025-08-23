const Router = require('express').Router();
const User = require('../models/user');

Router.post('/signup' , async (req,res) => {
    try {
        const newuser = await new User({
            username : req.body.username , 
            email : req.body.email , 
            password : req.body.password
        });
        await newuser.save();
        res.status(201).json(newuser)
        

    } catch (err) {
        res.send(err)

    }
})

module.exports = Router;