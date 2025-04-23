//sportsnookings.js under the modules folder
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    sport:String,
    date:String,
    time:String,
    residentInfo:String //for the resident information.
})

const UserModel = mongoose.model("Sports",bookingSchema);
module.exports = UserModel;