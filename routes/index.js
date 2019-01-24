var express = require('express');
var request = require('request')
const https = require('https');
var router = express.Router();

router.get('/wholeDataSet', function (req, res, next) {
    res.send(1);
});


module.exports = router;
