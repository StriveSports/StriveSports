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
        const {sport,date,time,residentInfo} = req.body;
        const newBooking = new UserModel({
            sport,
            date,
            time,
            residentInfo
        });
        await newBooking.save();
        res.status(201).json({message:"Booking successful"})
    } catch (error) {
        console.error("Error saving booking",error);
        res.status(500).json({error: "Failed to save booking"})
    }
})

// allowing the admin to make the bookings.
// app.get('/bookings', async (req, res) => {
//     try {
//         const bookings = await UserModel.find();
//         res.json(bookings);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch bookings" });
//     }
// });

// app.patch('/bookings/:id', async (req, res) => {
//     const { status } = req.body;
//     if (!['approved', 'rejected'].includes(status)) {
//         return res.status(400).json({ error: "Invalid status value" });
//     }
//     try {
//         const booking = await UserModel.findByIdAndUpdate(
//             req.params.id,
//             { status },
//             { new: true }
//         );
//         res.json({ message: `Booking ${status}`, booking });
//     } catch (error) {
//         console.error("Error updating booking status", error);
//         res.status(500).json({ error: "Failed to update booking" });
//     }
// });


app.listen(3000,() =>{
    console.log("Server is listening to port 3000")
})