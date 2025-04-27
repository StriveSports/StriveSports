// server/index.js

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({path:'.env'});
const UserModel = require('./models/sportsbooking')
const ReportModel = require('./models/reports')

const app = express()
//app.use(cors())
app.use(cors({
    origin: 'https://happy-wave-0b58f671e.6.azurestaticapps.net'
  }));
app.use(express.json())

const ATLAS_URL=process.env.ATLAS_URL;


mongoose.connect(ATLAS_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true

})
.then(()=>console.log("Mongodb connected"))
.catch((err)=> console.error("Mongodb connection error",err));

// allows the resident to make a booking.
// URL to make posts https://localhost:3000/bookings  
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
}); 

// allowing the admin to retrieve the bookings.
//URL to get bookings http://localhost:3000/bookings admin run get method
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await UserModel.find();
        res.json(bookings);
    } catch (err) {
        console.error('Failed to fetch bookings',err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});

//for testing server.
app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  

//update the booking status (approved or reject)
//URL for approve or reject http:localhost:3000/bookings/:id 
app.post('/bookings/:id', async (req, res) => {
    const { status } = req.body;
    if (!['approved', 'rejected','pending'].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    try {
        const updated = await UserModel.findByIdAndUpdate( //changed booking var to updated
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ message: `Booking ${status}`, booking:updated });
    } catch (error) {
        console.error("Error updating booking status", error);
        res.status(500).json({ error: "Failed to update booking" });
    }
});

// Delete a booking from admin dashboars
//URL for  http:localhost:3000/bookings/:id 
app.delete('/bookings/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        console.error('Error deleting booking', error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

{/*code for the model for reports.
 allows the resident to make a report .
 URL to make posts https://localhost:3000/reports */} 
app.post('/reports',async (req,res)=>{

    try {
        const {facility,issue,residentInfo} = req.body;
        {/*// Get the start and end of today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Check if the user already submitted a report today
        const existingReport = await Report.findOne({
            residentInfo: residentInfo,
            createdAt: { $gte: startOfToday, $lte: endOfToday }
        });

        if (existingReport) {
            return res.status(400).json({ message: "You have already submitted a report today." });
        } */}
        const newReport = new ReportModel({
            facility,
            issue,
            residentInfo
        });
        await newReport.save();
        res.status(201).json({message:"Report successful"})
    } catch (error) {
        console.error("Error saving report",error);
        res.status(500).json({error: "Failed to save report"})
    }
}); 

{/* allowing the admin to retrieve the bookings.
URL to get bookings http://localhost:3000/reports admin run get method*/}
app.get('/reports', async (req, res) => {
    try {
        const reports = await ReportModel.find();
        res.json(reports);
    } catch (err) {
        console.error('Failed to fetch reports',err);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
});

{/*update the booking status (approved or reject)

URL for approve or reject http:localhost:3000/reports/:id */}
app.post('/reports/:id', async (req, res) => {
    const { status } = req.body;
    if (!['In progress', 'Done','Pending'].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }
    try {
        const updatedreports = await ReportModel.findByIdAndUpdate( 
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ message: `Reporting ${status}`, booking:updatedreports });
    } catch (error) {
        console.error("Error updating report status", error);
        res.status(500).json({ error: "Failed to update report" });
    }
});

{/* Delete a booking from admin dashboars
  URL for  http:localhost:3000/reports/:id */}
app.delete('/reports/:id', async (req, res) => {
    try {
        await ReportModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Report deleted' });
    } catch (error) {
        console.error('Error deleting report', error);
        res.status(500).json({ error: 'Failed to delete report' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`)
})

{/*
    the :id is the MongoDB document _id taht the post response returns ,this allows you to path on
    the specific id huli
    
    - to use these create a button for rejecting or approve and look at the path thing the status is a new 
    column that will be added to the database so when a resident sends a booking we just make their
    status to be pending.
    
    
    */}