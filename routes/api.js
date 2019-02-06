var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var functions = require('../functions/functions')


router.get('/', function (req, res, next) {
    var testTweet = createTestTweet();

    res.send(testTweet);
});


module.exports = router;
