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
var functions = require('../models/twitterModel');
var twitterSimulation = mongoose.model('twitterSimulation');

function saveTwitterSimulation() {
    var testTwitterSimulation = new twitterSimulation({
        date: new Date(),
        id: 'id test',
        rtc: 101,
        text: 'This is some test text'
    });
    testTwitterSimulation.save(function (err) {
        if (err) return handleError(err);
        console.log('\nsaved tweet');
        getAllTwitterSimulation();
    });
}
function getAllTwitterSimulation() {
    var query = twitterSimulation.find({});
    query.then(function (doc) {
        console.log(doc);
        removeAll();
    });
}
function removeAll() {
    var removeAll = twitterSimulation.deleteMany({});
    removeAll.then(function (log, err) {
        if (log) {
            console.log(log)
        }
    });
}
saveTwitterSimulation();
