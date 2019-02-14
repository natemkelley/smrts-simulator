var fs = require('fs');

//database functions
var database = require('../functions/database')



exports.test = function (data) {

    return true
}

exports.testTweet = function (data) {
    var testTweet = JSON.parse(fs.readFileSync('models/testTwitterModel.json', 'utf8'))

    var returnArray = [];
    for (i = 0; i < 5; i++) {
        returnArray.push(testTweet)
    }


    return returnArray
}
