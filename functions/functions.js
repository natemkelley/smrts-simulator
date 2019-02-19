var fs = require('fs');
var colors = require('colors/safe');
var database = require('../functions/database')



exports.processUpload = function (data) {
    console.log('\nprocessing upload'.yellow);

    var goodToGo = checkHeaders(data);

    if (goodToGo) {
        console.log(colors.green('the headers are ' + goodToGo));
        var sim = buildSimulation(data);
        database.saveTwitterSimulation(sim)
    } else {
        console.log(colors.red('the headers are ' + goodToGo))
    }

    function buildSimulation(receivedSim) {
        var simulationArray = [];

        receivedSim.forEach(function (tweet) {
            var newTweet = buildTweet(tweet);
            simulationArray.push(newTweet)
        })

        return simulationArray
    }

    function buildTweet(tweet) {
        var tweetForm = JSON.parse(fs.readFileSync('models/testTwitterModel.json', 'utf8'));

        tweetForm.coordinates = tweet.coordinates;
        tweetForm.created_at = tweet.created_at;
        tweetForm.favorited = tweet.favorited;
        tweetForm.text = tweet.text;
        tweetForm.user.description = tweet.description;
        tweetForm.favorite_count = tweet.favorite_count;
        tweetForm.user.followers_count = tweet.followers_count;
        tweetForm.user.following = tweet.following;
        tweetForm.id_str = tweet.id_str;
        tweetForm.user.location = tweet.location;
        tweetForm.user.screen_name = tweet.screen_name;
        tweetForm.user.name = tweet.name;
        tweetForm.retweet_count = tweet.retweet_count;
        tweetForm.user.verified = tweet.verified;
        tweetForm.extended_entities.media.push({
            media_url: tweet.media_url,
            typeof: tweet.typeof
        });

        return tweetForm
    }

    function checkHeaders(receivedSim) {
        var status = true;
        var missingHeader = [];

        receivedSim.forEach(function (element) {
            if (!element.hasOwnProperty('created_at')) {
                missingHeader.push('created_at')
                status = false
            }
            if (!element.hasOwnProperty('id_str')) {
                missingHeader.push('id_str')
                status = false
            }
            if (!element.hasOwnProperty('retweet_count')) {
                missingHeader.push('retweet_count')
                status = false
            }
            if (!element.hasOwnProperty('favorite_count')) {
                missingHeader.push('favorite_count')
                status = false
            }
            if (!element.hasOwnProperty('favorited')) {
                missingHeader.push('favorited');
                status = false
            }
            if (!element.hasOwnProperty('text')) {
                missingHeader.push('text');
                status = false
            }
            if (!element.hasOwnProperty('description')) {
                missingHeader.push('description');
                status = false
            }
            if (!element.hasOwnProperty('followers_count')) {
                missingHeader.push('followers_count');
                status = false
            }
            if (!element.hasOwnProperty('following')) {
                missingHeader.push('following');
                status = false
            }
            if (!element.hasOwnProperty('location')) {
                missingHeader.push('location');
                status = false
            }
            if (!element.hasOwnProperty('name')) {
                missingHeader.push('name');
                status = false
            }
            if (!element.hasOwnProperty('screen_name')) {
                missingHeader.push('screen_name');
                status = false
            }
            if (!element.hasOwnProperty('media_url')) {
                missingHeader.push('media_url');
                status = false
            }
            if (!element.hasOwnProperty('typeof')) {
                missingHeader.push('typeof');
                status = false
            }
            if (!element.hasOwnProperty('verified')) {
                missingHeader.push('verified');
                status = false
            }
            if (!element.hasOwnProperty('coordinates')) {
                missingHeader.push('coordinates');
                status = false
            }
            if (!element.hasOwnProperty('reply')) {
                missingHeader.push('reply');
                status = false
            }
        });

        if (!status) {
            console.log(removeDuplicatesFromHeaderArray(missingHeader))
        }

        return status

        function removeDuplicatesFromHeaderArray(array) {
            return array.filter(function (item, index) {
                return array.indexOf(item) >= index;
            });
        }
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
