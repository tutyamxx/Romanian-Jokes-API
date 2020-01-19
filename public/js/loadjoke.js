const RequestJokeFromAPI = "https://romanian-jokes-api.herokuapp.com/api/romanianjokes";

const RandomCancerEmoji =
[
    "🤣", "😂", "😹", "🤪", "😸", "😁", "😎"
];

// --| Load a random romanian joke on page load
$(document).ready()
{
    GetRandomRomanianJoke();
};

// --| Function to get a random romanian joke
function GetRandomRomanianJoke()
{
    // --| Add a fake loading text until the API responds
    $("#romanian-jokes").effect("shake", { times: 2 }, 300);
    $("textarea").empty();
    $("#romanian-jokes").append("Generating a dumb joke...");
    
    let szJokeRetrieved = "";
    let iJokeNumber = 0;

    // --| Randomly assign an emoji to the button
    $("#change-emoji").empty().text("Generate Joke 👌" + RandomCancerEmoji[Math.floor(Math.random() * RandomCancerEmoji.length)]);

    // --| Wait for JSON result
    $.when($.getJSON(RequestJokeFromAPI.toString(), function(data)
    {
        szJokeRetrieved = data.joke.toString();
        iJokeNumber = parseInt(data.id);

    })).done(function ()
    {
        // --| Result succeeded
        // --| Clear the textarea and add new freshly generated joke
        $("textarea").empty();
        $("#romanian-jokes").append(szJokeRetrieved);

        // --| Clear the joke number div and refresh with the current number
        $("#joke-number").empty().html('<a href="' + RequestJokeFromAPI + '/' + iJokeNumber + '" target="_blank">Joke ID: #' + iJokeNumber + '</a>');

    }).fail(function ()
    {
        // --| Result failed
        // --| Notify the user with this custom error message
        szJokeRetrieved = "Ey, you're spamming the API, try again in 1 minute maybe?";

        // --| Clear the textarea and add new freshly generated response
        $("textarea").empty();
        $("#romanian-jokes").append(szJokeRetrieved);

        // --| Clear the Joke ID link
        $("#joke-number").empty();
    });
};