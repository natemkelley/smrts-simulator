var functions = require('../functions/functions')
var mongoose = require('mongoose');

//define where to connect the database
mongoose.connect('mongodb://localhost/smrts', {
    useNewUrlParser: true
});

//successful connection
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open'.green);
});

//check for errors
mongoose.connection.on('error', function (err) {
    if (err) {
        throw err;
    }
});



/***********TWITTER SIMULATIONS*************/
//define the model and schema for twitter
require('../models/twitterModel');
var twitterSimulationModel = mongoose.model('twitterSimulationModel');
var tweetScheme = mongoose.model('tweetModel');

function saveTwitterSimulation(twitterSimulationData) {
    var testTweetSimulation = functions.testTweetSimulation();

    var saveThisTwitterSimulation = new twitterSimulationModel({
        date: new Date(),
        user: 'test user',
        nameOfSim: 'test simulation',
        type: 'twitter',
        groups: ['group 1', 'group 2'],
        private: false,
        simulation: testTweetSimulation
    });
    saveThisTwitterSimulation.save(function (err) {
        if (err) return handleError(err);
        console.log('testing saved tweet successful'.green);
    });
}

function getAllTwitterSimulation() {
    var query = twitterSimulation.find({});
    query.then(function (doc) {
        //removeAll();
    });
}

function removeAll() {
    var removeAll = twitterSimulation.deleteMany({});
    removeAll.then(function (log, err) {
        if (log) {
            console.log('deleting all tweets status '.yellow + JSON.stringify(log).yellow)
        }
    });
}
saveTwitterSimulation();
