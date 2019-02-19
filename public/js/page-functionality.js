$("button").click(function () {
    sendTestSimulation();
});



function sendTestSimulation() {
    uploadSimulation(createSimulation());

    function createSimulation() {
        var simulation = []

        for (var i = 0; i < 10; i++) {
            simulation.push(createTweet());
        }

        console.log(simulation)
        return simulation
    }

    function createTweet() {
        var tweet = {
            created_at: randomDate(new Date(2012, 0, 1), new Date()),
            id_str: Math.floor(Math.random() * 100000000 + 1),
            retweet_count: Math.floor(Math.random() * 100),
            favorite_count: Math.floor(Math.random() * 1000),
            favorited:  Math.random() >= 0.5,
            text: "this is the text for the tweet",
            description: "this is a description",
            followers_count: Math.floor(Math.random() * 1000),
            following: [],
            statuses_count: Math.floor(Math.random() * 1000),
            location: "this is a location",
            name: "user name",
            screen_name: "twitterHandle",
            media_url: "https://pbs.twimg.com/profile_images/1092100446586630146/3uFY0wpD_400x400.jpg",
            typeof: "image",
            verified:  Math.random() >= 0.5,
            coordinates: [-75.14310264, 40.05701649],
            replyy: "I don't know what to do for this field"
        }

        return tweet
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

}

function callAPI() {
    $.getJSON("/api", function (data) {
        $('.test').append(createPrettyJavaScript(data));
        Prism.highlightAll();
    });

    function createPrettyJavaScript(data) {
        var string = JSON.stringify(data, undefined, 1)
        //var html = '<pre>' + syntaxHighlight(string) + "</pre>"
        var html = '<pre><code class="language-json">' + (string) + "</code></pre>";
        return html
    }
}
