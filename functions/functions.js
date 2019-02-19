var fs = require('fs');

//database functions
var database = require('../functions/database')

exports.processUpload = function (data){
    console.log('\nprocessing upload'.red);
    
}


exports.test = function (data) {

    return true
}

exports.testTweetSimulation = function (data) {
    var tweet = JSON.parse(fs.readFileSync('models/testTwitterModel.json', 'utf8'));
    var tweetArray = [];

    for (var i = 0; i < 50; i++) {
        tweetArray.push(tweet);
    }

    return tweetArray
}

/*
Timestamp
ID string
Retweet count
Like count
favorite
Text
User description
User followers
User following
User # messages sent
User location
User name
User Twitter handle
User images
Verified user status
Geo coordinates
Reply fields (like 5+ different items)
*/
