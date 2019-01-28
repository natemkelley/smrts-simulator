var express = require('express');
var request = require('request')
const https = require('https');
var router = express.Router();

router.get('/', function (req, res, next) {
    var testJSON = {
        testing: true
    }
    res.send(testJSON);
});


module.exports = router;
