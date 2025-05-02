//reports.js under the modules folder
const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    event:String,
    date:String,
    time_from:String,
    time_to:String, 
    event_description:String,

}); 


const EventModel = mongoose.model("events",eventsSchema);
module.exports = EventModel;