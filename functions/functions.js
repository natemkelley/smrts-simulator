var fs = require('fs');
var colors = require('colors/safe');
var database = require('../functions/database')
var functions = require('../functions/functions')
var sockets = require('../routes/socket')
var csv = require('csvtojson')

//receive json with valid fields from receive uploaded, check headers, place into model, send confirmation
exports.processUpload = function (data) {
    console.log('\nreceived upload'.green);

    var goodToGo = checkHeadersAndFields(data);

    if (goodToGo.status) {
        console.log(colors.green('the headers are good'));
        var sim = buildSimulation(formatFields(data));
        database.saveTwitterSimulation(sim);
    } else {
        console.log(colors.red('the headers are bad'));
        sockets.sendUploadStatus(goodToGo)
    }


    //create a simulation with uploaded data and twitter model
    function buildSimulation(receivedSim) {
        var simulationArray = [];

        console.log('\nbuilding simulation'.cyan);
        receivedSim.forEach(function (tweet) {
            var newTweet = buildTweet(tweet);
            simulationArray.push(newTweet)
        })

        return simulationArray
    }

    //create a tweet from the tweet model and returns new tweet
    function buildTweet(tweet) {
        var tweetForm = JSON.parse(fs.readFileSync('models/usableTwitterModel.json', 'utf8'));

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

    //checks for required fields from upload
    function checkHeadersAndFields(receivedSim) {
        var returnVal = {
            status: true
        };

        var missingHeader = [];
        var missingFields = [];
        var tweetCounter = 0;

        //check for existing headers
        receivedSim.forEach(function (element) {
            if (!element.hasOwnProperty('created_at')) {
                missingHeader.push('created_at')
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('id_str')) {
                missingHeader.push('id_str')
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('retweet_count')) {
                missingHeader.push('retweet_count')
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('favorite_count')) {
                missingHeader.push('favorite_count')
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('favorited')) {
                missingHeader.push('favorited');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('text')) {
                missingHeader.push('text');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('description')) {
                missingHeader.push('description');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('followers_count')) {
                missingHeader.push('followers_count');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('following')) {
                missingHeader.push('following');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('location')) {
                missingHeader.push('location');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('name')) {
                missingHeader.push('name');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('screen_name')) {
                missingHeader.push('screen_name');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('media_url')) {
                missingHeader.push('media_url');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('typeof')) {
                missingHeader.push('typeof');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('verified')) {
                missingHeader.push('verified');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('coordinates')) {
                missingHeader.push('coordinates');
                returnVal.status = false;
            }
            if (!element.hasOwnProperty('reply')) {
                missingHeader.push('reply');
                returnVal.status = false;
            }

            tweetCounter++;
        });
        returnVal.missingHeader = removeDuplicatesFromArray(missingHeader)

        //return that it is missing a header
        if (!returnVal.status) {
            return returnVal
        }

        //check for populated fields
        receivedSim.forEach(function (element) {
            if (element.created_at.length < 2) {
                returnVal.status = false;
                returnVal.missingFields = ['Blank Fields'];
            }
        });


        return returnVal

        function removeDuplicatesFromArray(array) {
            return array.filter(function (item, index) {
                return array.indexOf(item) >= index;
            });
        }

    }

    //ensures that certain fields are corrent (numbers, arrays, strings)
    function formatFields(jsonArray) {
        var returnArray = [];
        jsonArray.forEach(function (tweet) {
            tweet.following = tweet.following.split(',');
            tweet.coordinates = tweet.coordinates.split(',');
            returnArray.push(tweet)
        })
        return jsonArray
    }

}

//reveives data from socket and sends it to an json format
exports.receiveUpload = function (data) {
    var fileLocation = data.file.pathName;
    var extension = fileLocation.substr(fileLocation.length - 4);

    if (extension.includes('csv')) {
        console.log(extension);
        csvToJSON(fileLocation).then((jsonArray) => {
            functions.processUpload(jsonArray) //NOTHING HAPPENS AFTER THAT
        });;
    } else {
        console.log(colors.red('wrong file extension'));
        removeFile(fileLocation)
    }

}

//promise that returns a json array
function csvToJSON(fileLocation) {
    return new Promise((resolve, reject) => {
        csv()
            .on('error', (err) => {
                console.log(colors.red(err));
            })
            .fromFile(fileLocation)
            .then((jsonObj) => {
                removeFile(fileLocation);
                resolve(jsonObj);
            })
    })
}

//remove file after upload
function removeFile(fileLocation) {
    fs.unlink(fileLocation, (err) => {
        if (err) throw err;
        console.log('successfully deleted ' + fileLocation);
    });
}

//create a simulation test
exports.testTweetSimulation = function (data) {
    var tweet = JSON.parse(fs.readFileSync('models/usableTwitterModel.json', 'utf8'));
    var tweetArray = [];

    for (var i = 0; i < 50; i++) {
        tweetArray.push(tweet);
    }

    return tweetArray
}
