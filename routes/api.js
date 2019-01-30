var express = require('express');
var request = require('request')
const https = require('https');
var router = express.Router();

function createTestTweet() {
    var testTweet = {
        "created_at": "Thu Apr 06 15:24:15 +0000 2017",
        "id_str": "850006245121695744",
        "text": "1\/ Today we\u2019re sharing our vision for the future of the Twitter API platform!\nhttps:\/\/t.co\/XweGngmxlP",
        "user": {
            "id": 2244994945,
            "name": "Twitter Dev",
            "screen_name": "TwitterDev",
            "location": "Internet",
            "url": "https:\/\/dev.twitter.com\/",
            "description": "Your official source for Twitter Platform news, updates & events. Need technical help? Visit https:\/\/twittercommunity.com\/ \u2328\ufe0f #TapIntoTwitter"
        },
        "place": {},
        "entities": {
            "hashtags": [
    ],
            "urls": [
                {
                    "url": "https:\/\/t.co\/XweGngmxlP",
                    "unwound": {
                        "url": "https:\/\/cards.twitter.com\/cards\/18ce53wgo4h\/3xo1c",
                        "title": "Building the Future of the Twitter API Platform"
                    }
      }
    ],
            "user_mentions": [
    ]
        }
    }

    
    return testTweet
}



router.get('/', function (req, res, next) {
    var testJSON = {
        testing: true
    }
    
    var testTweet = createTestTweet();
    //console.log(testTweet)
    res.send(testTweet);
});


module.exports = router;
