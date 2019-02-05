var mongoose = require('mongoose');


//define the schema for the data
var twitterSimulationSchema = new mongoose.Schema({
    date: Date,
    id: String,
    rtc: Number,
    text: String
});


//createa a model to be called when creating a new simulation
mongoose.model('twitterSimulation', twitterSimulationSchema);



