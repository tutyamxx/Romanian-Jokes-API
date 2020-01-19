const RequestJokeFromAPI = "https://romanian-jokes-api.herokuapp.com/api/romanianjokes";

const RandomCancerEmoji =
[
    "🤣", "😂", "😹", "🤪", "😸", "😁", "😎"
];

// --| Load a random romanian joke on page load
$(document).ready()
{
    GetRandomRomanianJoke();

    // --| Prevent enter spam
    $("#change-emoji").keypress(function (event)
    {
        if(event.keyCode === 10 || event.keyCode === 13)
        {
            event.preventDefault();
        }
    });
};

function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// --| Function to get a random romanian joke
function GetRandomRomanianJoke()
{
    // --| Add a fake loading text until the API responds
    $("#romanian-jokes").effect("shake", { times: 2 }, 300);
    $("textarea").empty();
    $("#romanian-jokes").append("Fetching a dumb joke...");
    $("#joke-category").empty().text("Category: Fetching...");
    
    let szJokeRetrieved = "";
    let szJokeCategory = "";
    let iJokeNumber = 0;

    // --| Randomly assign an emoji to the button
    $("#change-emoji").empty().text("Random Joke 👌" + RandomCancerEmoji[Math.floor(Math.random() * RandomCancerEmoji.length)]);

    // --| Wait for JSON result
    $.when($.getJSON(RequestJokeFromAPI.toString(), function(data)
    {
        szJokeRetrieved = data.joke.toString();
        szJokeCategory = data.joketype.toString();
        iJokeNumber = parseInt(data.id);

    })).done(function ()
    {
        // --| Result succeeded
        // --| Clear the textarea and add new freshly generated joke
        $("textarea").empty();
        $("#romanian-jokes").append(szJokeRetrieved);
        $("#joke-category").empty().text("Category: " + capitalizeFirstLetter(szJokeCategory));

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
        $("#joke-category").empty().text("Category: 🤬");
    });
};