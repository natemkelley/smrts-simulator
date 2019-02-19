var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    text: String,
    truncated: Boolean,
    in_reply_to_user_id: Number,
    in_reply_to_status_id: Number,
    favorited: Boolean,
    source: String,
    in_reply_to_screen_name: String,
    in_reply_to_status_id_str: String,
    id_str: String,
    entities: {
        user_mentions: [
            {
                indices: [Number],
                screen_name: String,
                id_str: String,
                name: String,
                id: Number
            }
        ],
        urls: [String],
        hashtags: [String]
    },
    extended_entities: {
        media: [{
            media_url: String,
            type: String
        }]
    },
    contributors: [String],
    retweeted: Boolean,
    in_reply_to_user_id_str: String,
    place: String,
    retweet_count: Number,
    created_at: Date,
    retweeted_status: {
        text: String,
        truncated: Boolean,
        in_reply_to_user_id: Number,
        in_reply_to_status_id: Number,
        favorited: Boolean,
        source: String,
        in_reply_to_screen_name: String,
        in_reply_to_status_id_str: String,
        id_str: String,
        entities: {
            user_mentions: [String],
            urls: [String],
            hashtags: [
                {
                    text: String,
                    indices: [Number]
                }
            ]
        },
        contributors: String,
        retweeted: Boolean,
        in_reply_to_user_id_str: String,
        place: String,
        retweet_count: Number,
        created_at: Date,
        user: {
            notifications: [String],
            profile_use_background_image: Boolean,
            statuses_count: Number,
            profile_background_color: String,
            followers_count: Number,
            profile_image_url: String,
            listed_count: Number,
            profile_background_image_url: String,
            description: String,
            screen_name: String,
            default_profile: Boolean,
            verified: Boolean,
            time_zone: String,
            profile_text_color: String,
            is_translator: Boolean,
            profile_sidebar_fill_color: String,
            location: String,
            id_str: String,
            default_profile_image: Boolean,
            profile_background_tile: Boolean,
            lang: String,
            friends_count: Number,
            protected: Boolean,
            favourites_count: Number,
            created_at: Date,
            profile_link_color: String,
            name: String,
            show_all_inline_media: Boolean,
            follow_request_sent: Boolean,
            geo_enabled: Boolean,
            profile_sidebar_border_color: String,
            url: String,
            id: Number,
            contributors_enabled: Boolean,
            following: [String],
            utc_offset: Number
        },
        id: Number,
        coordinates: [],
        geo: []
    },
    user: {
        notifications: [String],
        profile_use_background_image: Boolean,
        statuses_count: Number,
        profile_background_color: String,
        followers_count: Number,
        profile_image_url: String,
        listed_count: Number,
        profile_background_image_url: String,
        description: String,
        screen_name: String,
        default_profile: Boolean,
        verified: Boolean,
        time_zone: String,
        profile_text_color: String,
        is_translator: Boolean,
        profile_sidebar_fill_color: String,
        location: String,
        id_str: String,
        default_profile_image: Boolean,
        profile_background_tile: Boolean,
        lang: String,
        friends_count: Number,
        protected: Boolean,
        favourites_count: Number,
        created_at: Date,
        profile_link_color: String,
        name: String,
        show_all_inline_media: Boolean,
        follow_request_sent: Boolean,
        geo_enabled: Boolean,
        profile_sidebar_border_color: String,
        url: String,
        id: Number,
        contributors_enabled: Boolean,
        following: [String],
        utc_offset: Number
    },
    id: Number,
    coordinates: [],
    geo: []
});

//define the schema for the data
var twitterSimulationSchema = new mongoose.Schema({
    user: String,
    nameOfSim: String,
    type: String,
    groups: [String],
    private: Boolean,
    date: Date,
    simulation: [tweetSchema]
});



//createa a model to be called when creating a new simulation
mongoose.model('tweetModel', twitterSimulationSchema);
mongoose.model('twitterSimulationModel', twitterSimulationSchema);






/*
===Fields Amanda wants to have used===

Timestamp
ID string !
Retweet count !
Like count !
favorite !
Text !
User description !
User followers !
User following !
User # messages sent
User location
User name
User Twitter handle
User images
Verified user status
Geo coordinates
Reply fields (like 5+ different items)

===All Tweet Fields (from Twitter documentation)===

Attribute 	Type 	Description
created_at 	String 	UTC time when this Tweet was created. Example: "created_at":"Wed Aug 27 13:08:45 +0000 2008"

id 	Int64 	The integer representation of the unique identifier for this Tweet. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in interpreting it. Using a signed 64 bit integer for storing this identifier is safe. 
Use id_str for fetching the identifier to stay on the safe side. See Twitter IDs, JSON and Snowflake . Example: "id":114749583439036416

id_str 	String 	The string representation of the unique identifier for this Tweet. Implementations should use this rather than the large integer in id. Example: "id_str":"114749583439036416"

text 	String 	The actual UTF-8 text of the status update. See twitter-text for details on what characters are currently considered valid. Example: "text":"Tweet Button, Follow Button, and Web Intents"

source 	String 	Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web. Example: "source":"Twitter for Mac"

truncated 	Boolean   Indicates whether the value of the text parameter was truncated, for example, as a result of a retweet exceeding the original Tweet text length limit of 140 characters. Truncated text will end in ellipsis, like this ... Since Twitter now rejects long Tweets vs truncating them, the large majority of Tweets will have this set to false .
 Note that while native retweets may have their toplevel text property shortened, the original text will be available under the retweeted_status object and the truncated parameter will be set to the value of the original status (in most cases, false ). Example: "truncated":true

in_reply_to_status_id 	Int64 	Nullable. If the represented Tweet is a reply, this field will contain the integer representation of the original Tweet’s ID. Example: "in_reply_to_status_id":114749583439036416

in_reply_to_status_id_str 	String 	Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s ID. Example: "in_reply_to_status_id_str":"114749583439036416"

in_reply_to_user_id 	Int64 	Nullable. If the represented Tweet is a reply, this field will contain the integer representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet. Example: "in_reply_to_user_id":819797

in_reply_to_user_id_str 	String 	Nullable. If the represented Tweet is a reply, this field will contain the string representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet. Example: "in_reply_to_user_id_str":"819797"

in_reply_to_screen_name 	String 	Nullable. If the represented Tweet is a reply, this field will contain the screen name of the original Tweet’s author. Example: "in_reply_to_screen_name":"twitterapi"

user 	User object 	The user who posted this Tweet. See User data dictionary for complete list of attributes. Example highlighting select attributes:

{
  "user": {
    "id": 2244994945,
    "id_str": "2244994945",
    "name": "TwitterDev",
    "screen_name": "TwitterDev",
    "location": "Internet",
    "url": "https://dev.twitter.com/",
    "description": "Your source for Twitter news",
    "verified": true,
    "followers_count": 477684,
    "friends_count": 1524,
    "listed_count": 1184,
    "favourites_count": 2151,
    "statuses_count": 3121,
    "created_at": "Sat Dec 14 04:35:55 +0000 2013",
    "utc_offset": null,
    "time_zone": null,
    "geo_enabled": true,
    "lang": "en",
    "profile_image_url_https": "https://pbs.twimg.com/"
  }
}

coordinates 	Coordinates 	Nullable. Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates array is formatted as geoJSON (longitude first, then latitude). Example:

"coordinates":
{
    "coordinates":
    [
        -75.14310264,
        40.05701649
    ],
    "type":"Point"
}

place 	Places 	Nullable When present, indicates that the tweet is associated (but not necessarily originating from) a Place . Example:

"place":
{
  "attributes":{},
   "bounding_box":
  {
     "coordinates":
     [[
           [-77.119759,38.791645],
           [-76.909393,38.791645],
           [-76.909393,38.995548],
           [-77.119759,38.995548]
     ]],
     "type":"Polygon"
  },
   "country":"United States",
   "country_code":"US",
   "full_name":"Washington, DC",
   "id":"01fbe706f872cb32",
   "name":"Washington",
   "place_type":"city",
   "url":"http://api.twitter.com/1/geo/id/0172cb32.json"
}

quoted_status_id 	Int64 	This field only surfaces when the Tweet is a quote Tweet. This field contains the integer value Tweet ID of the quoted Tweet. Example: "quoted_status_id":114749583439036416

quoted_status_id_str 	String 	This field only surfaces when the Tweet is a quote Tweet. This is the string representation Tweet ID of the quoted Tweet. Example: "quoted_status_id_str":"114749583439036416"

is_quote_status 	Boolean 	Indicates whether this is a Quoted Tweet. Example: "is_quote_status":false

quoted_status 	Tweet 	This field only surfaces when the Tweet is a quote Tweet. This attribute contains the Tweet object of the original Tweet that was quoted.

retweeted_status 	Tweet 	Users can amplify the broadcast of Tweets authored by other users by retweeting . Retweets can be distinguished from typical Tweets by the existence of a retweeted_status attribute. This attribute contains a representation of the original Tweet that was retweeted. 
Note that retweets of retweets do not show representations of the intermediary retweet, but only the original Tweet. (Users can also unretweet a retweet they created by deleting their retweet.)

quote_count 	Integer  Nullable. Indicates approximately how many times this Tweet has been quoted by Twitter users. Example: "quote_count":1138 Note: This object is only available with the Premium and Enterprise tier products.

reply_count 	Int 	Number of times this Tweet has been replied to. Example: "reply_count":1585 Note: This object is only available with the Premium and Enterprise tier products.

retweet_count 	Int 	Number of times this Tweet has been retweeted. Example: "retweet_count":1585

favorite_count 	Integer 	Nullable. Indicates approximately how many times this Tweet has been liked by Twitter users. Example: "favorite_count":1138

entities 	Entities 	Entities which have been parsed out of the text of the Tweet. Additionally see Entities in Twitter Objects . Example:

"entities":
{
    "hashtags":[],
    "urls":[],
    "user_mentions":[],
    "media":[],
    "symbols":[]
    "polls":[]
}

extended_entities 	Extended Entities 	When between one and four native photos or one video or one animated GIF are in Tweet, contains an array 'media' metadata. Additionally see Entities in Twitter Objects . Example:

"entities":
{
    "media":[]
}

favorited 	Boolean 	Nullable. Indicates whether this Tweet has been liked by the authenticating user. Example: "favorited":true

retweeted 	Boolean 	Indicates whether this Tweet has been Retweeted by the authenticating user. Example: "retweeted":false

possibly_sensitive 	Boolean 	Nullable. This field only surfaces when a Tweet contains a link. The meaning of the field doesn’t pertain to the Tweet content itself, but instead it is an indicator that the URL contained in the Tweet may contain content or media identified as sensitive content. Example: "possibly_sensitive":true

filter_level 	String 	Indicates the maximum value of the filter_level parameter which may be used and still stream this Tweet. So a value of medium will be streamed on none, low, and medium streams. Example: "filter_level": "medium"

lang 	String 	Nullable. When present, indicates a BCP 47 language identifier corresponding to the machine-detected language of the Tweet text, or und if no language could be detected. See more documentation HERE. Example: "lang": "en"

matching_rules 	Array of Rule Objects 	Present in filtered products such as Twitter Search and PowerTrack. Provides the id and tag associated with the rule that matched the Tweet. With PowerTrack, more than one rule can match a Tweet. See more documentation HERE. Example:

"matching_rules": " [{
        "tag": "rain Tweets",
        "id": 831566737246023680,
        "id_str": "831566737246023680"
    }, {
        "tag": "snow Tweet",
        "id": 831567402366218240,
        "id_str": "831567402366218240"    
     }]"


*/
