//sportsnookings.js under the modules folder
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    sport:String,
    date:String,
    time:String,
    residentInfo:String //for the resident information.
})

//when admin books the status that should appear to uodate the schema
// const bookingSchema = new mongoose.Schema({
//     sport: String,
//     date: String,
//     time: String,
//     residentInfo: Object,
//     status: {
//         type: String,
//         enum: ['pending', 'approved', 'rejected'],
//         default: 'pending'
//     }
// });

const UserModel = mongoose.model("Sports",bookingSchema);
module.exports = UserModel;