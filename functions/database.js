var colors = require('colors/safe');
var functions = require('../functions/functions')
var sockets = require('../routes/socket')
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

//promise that take in twitter simulation information and saves it to mongo
exports.saveTwitterSimulation = function (twitterSimulationData, user, nameOfSim, private, groups) {
    return new Promise((resolve, reject) => {
        if (!user) {
            user = 'default user'
        }
        if (!nameOfSim) {
            nameOfSim = 'simulation_' + Math.floor(Math.random() * 1000000 + 1)
        }
        if (!private) {
            private = false
        }
        if (!groups) {
            groups = []
        }

        var saveThisTwitterSimulation = new twitterSimulationModel({
            date: new Date(),
            user: user,
            nameOfSim: nameOfSim,
            type: 'twitter',
            groups: groups,
            private: private,
            views:0,
            simulation: twitterSimulationData
        });
        console.log(colors.cyan('preparing to save simulation'));
        saveThisTwitterSimulation.save(function (err) {
            if (err) return handleError(err);
            console.log('saved tweet saved successfully'.green);

            var returnVal = {
                status: true
            };
            resolve(returnVal)
        });

    })
}

//promise that returns all twitter simulations excluding some information
exports.getAllTwitterSimulation = function () {
    return new Promise((resolve, reject) => {
        var query = twitterSimulationModel.find({
            private: false
        }, ['-simulation', '-groups']);
        query.then(function (doc) {
            resolve(doc)
            //removeAll();
        });
    })
}

function removeAll() {
    var removeAll = twitterSimulationModel.deleteMany({});
    removeAll.then(function (log, err) {
        if (log) {
            console.log('deleting all tweets status '.red + JSON.stringify(log).red)
        }
    });
}

function handleError(err) {
    console.log(colors.red(err));
}
