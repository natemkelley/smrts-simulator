$("button").click(function () {
    callAPI();
});

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
