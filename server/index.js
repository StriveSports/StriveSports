// server/index.js

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({path:'./config.env'});
const UserModel = require('./models/sportsbooking')

const app = express()
app.use(cors())
app.use(express.json())

const ATLAS_URL=process.env.ATLAS_URL;


mongoose.connect(ATLAS_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true

})
.then(()=>console.log("Mongodb connected"))
.catch((err)=> console.error("Mongodb connection error",err));

app.post('/bookings',async (req,res)=>{
    try {
        const {sport,date,time,resInfo} = req.body;
        const newBooking = new UserModel({
            sport,
            date,
            time,
            resInfo
        });
        await newBooking.save();
        res.status(201).json({message:"Booking successful"})
    } catch (error) {
        console.error("Error saving booking",error);
        res.status(500).json({error: "Failed to save booking"})
    }
})

// app.get('/getbookings',(req,res)=>{
//     UserModel.find()
//     .then(Sports=> res.json(Sports))
//     .catch(err => res.json(err))
// })

app.listen(3000,() =>{
    console.log("Server is listening to port 3000")
})