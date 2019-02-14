var mongoose = require('mongoose');


//define the schema for the data
var twitterSimulationSchema = new mongoose.Schema({
    user: Date,
    nameOfSim: String,
    type: Number,
    groups:Array,
    private:Boolean,
    date:Date,
    simulation:{}
});


//createa a model to be called when creating a new simulation
mongoose.model('twitterSimulation', twitterSimulationSchema);
