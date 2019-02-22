var fs = require('fs');
var colors = require('colors/safe');
var database = require('../functions/database')
var functions = require('../functions/functions')
var sockets = require('../routes/socket')
var csv = require('csvtojson')

//promise, reveives data from socket, checks format, sends it to be processed or alerts user that format is wrong
exports.receiveUpload = function (data) {
    return new Promise((resolve, reject) => {
        var fileLocation = data.file.pathName;
        var extension = fileLocation.substr(fileLocation.length - 4);

        if (extension.includes('csv')) {
            console.log(extension);
            csvToJSON(fileLocation).then((jsonArray) => {
                processUpload(jsonArray).then((status) => {
                    resolve(status)
                })
            });
        } else {
            console.log(colors.red('wrong file extension'));
            removeFile(fileLocation);
            var status = {
                status: false,
                problem: 'not a .csv file'
            }
            resolve(status)
        }
    })

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

    //receive json with valid fields from receiveUploade function, check headers, place into model, send confirmation
    function processUpload(data) {
        return new Promise((resolve, reject) => {
            console.log('\nreceived upload'.green);
            var goodToGo = checkHeadersAndFields(data);
            if (goodToGo.status) {
                console.log(colors.green('the headers are good'));
                var sim = buildSimulation(formatFields(data));
                database.saveTwitterSimulation(sim).then((status) => {
                    resolve(status)
                });
            } else {
                console.log(colors.red('something inside the .csv is wrong'));
                resolve(goodToGo)
            }
        })

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

            var problem = [];

            //check for existing headers
            receivedSim.forEach(function (element) {
                if (!element.hasOwnProperty('created_at')) {
                    problem.push('created_at')
                }
                if (!element.hasOwnProperty('id_str')) {
                    problem.push('id_str')
                }
                if (!element.hasOwnProperty('retweet_count')) {
                    problem.push('retweet_count')
                }
                if (!element.hasOwnProperty('favorite_count')) {
                    problem.push('favorite_count')
                }
                if (!element.hasOwnProperty('favorited')) {
                    problem.push('favorited');
                }
                if (!element.hasOwnProperty('text')) {
                    problem.push('text');
                }
                if (!element.hasOwnProperty('description')) {
                    problem.push('description');
                }
                if (!element.hasOwnProperty('followers_count')) {
                    problem.push('followers_count');
                }
                if (!element.hasOwnProperty('following')) {
                    problem.push('following');
                }
                if (!element.hasOwnProperty('location')) {
                    problem.push('location');
                }
                if (!element.hasOwnProperty('name')) {
                    problem.push('name');
                }
                if (!element.hasOwnProperty('screen_name')) {
                    problem.push('screen_name');
                }
                if (!element.hasOwnProperty('media_url')) {
                    problem.push('media_url');
                }
                if (!element.hasOwnProperty('typeof')) {
                    problem.push('typeof');
                }
                if (!element.hasOwnProperty('verified')) {
                    problem.push('verified');
                }
                if (!element.hasOwnProperty('coordinates')) {
                    problem.push('coordinates');
                }
                if (!element.hasOwnProperty('reply')) {
                    problem.push('reply');
                }
            });
            returnVal.problem = removeDuplicatesFromArray(problem)

            //return that it is missing a header
            if (problem.length > 0) {
                returnVal.status = false;
                return returnVal
            }

            //check for populated fields
            receivedSim.forEach(function (element) {
                if (element.created_at.length < 2) {
                    returnVal.status = false;
                    returnVal.problem = ['Blank Fields'];
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

                if (!Array.isArray(tweet.following)) {
                    tweet.following = tweet.following.split(',');
                }
                if (!Array.isArray(tweet.coordinates)) {
                    tweet.coordinates = tweet.coordinates.split(',');
                }
                returnArray.push(tweet)
            })
            return jsonArray
        }

    }
}

//remove file after upload
function removeFile(fileLocation) {
    fs.unlink(fileLocation, (err) => {
        if (err) throw err;
        console.log('successfully deleted ' + fileLocation);
    });
}

//create a simulation test
exports.testTweets = function (numberOfTweets) {
    var tweet = JSON.parse(fs.readFileSync('models/testTwitterModel-example.json', 'utf8'));
    var tweetArray = [];

    if (numberOfTweets == null) {
        numberOfTweets = 1;
    }

    for (var i = 0; i < numberOfTweets; i++) {
        tweetArray.push(tweet);
    }

    return tweetArray
}
