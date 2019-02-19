var fs = require('fs');
var colors = require('colors/safe');
var database = require('../functions/database')



exports.processUpload = function (data) {
    console.log('\nprocessing upload'.yellow);

    var goodToGo = checkHeaders(data);

    if (goodToGo) {
        console.log(colors.green('the headers are ' + goodToGo))

    } else {
        console.log(colors.red('the headers are ' + goodToGo))
    }

    function buildTweet(){
        
    }
    
    function checkHeaders(receivedSim) {
        var status = true;

        receivedSim.forEach(function (element) {
            if (!element.hasOwnProperty('created_at')) {
                status = false
            }
            if (!element.hasOwnProperty('id_str')) {
                status = false
            }
            if (!element.hasOwnProperty('retweet_count')) {
                status = false
            }
            if (!element.hasOwnProperty('favorite_count')) {
                status = false
            }
            if (!element.hasOwnProperty('favorited')) {
                status = false
            }
            if (!element.hasOwnProperty('text')) {
                status = false
            }
            if (!element.hasOwnProperty('description')) {
                status = false
            }
            if (!element.hasOwnProperty('followers_count')) {
                status = false
            }
            if (!element.hasOwnProperty('following')) {
                status = false
            }
            if (!element.hasOwnProperty('statuses_count')) {
                status = false
            }
            if (!element.hasOwnProperty('location')) {
                status = false
            }
            if (!element.hasOwnProperty('name')) {
                status = false
            }
            if (!element.hasOwnProperty('screen_name')) {
                status = false
            }
            if (!element.hasOwnProperty('media_url')) {
                status = false
            }
            if (!element.hasOwnProperty('type')) {
                status = false
            }
            if (!element.hasOwnProperty('verified')) {
                status = false
            }
            if (!element.hasOwnProperty('coordinates')) {
                status = false
            }
            if (!element.hasOwnProperty('reply')) {
                status = false
            }
        });

        return status
    }
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
