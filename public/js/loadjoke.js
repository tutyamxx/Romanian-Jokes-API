const requestJokeFromAPI = "https://romanian-jokes-api.herokuapp.com/v1/romanianjokes";
const randomCancerEmoji = [ "🤣", "😂", "😹", "🤪", "😸", "😁", "😎", "💩", "😝", "🤭", "🙊", "👻" ];

// --| Load a random romanian joke on page load
$(document).ready(function() {
    // --| Generate a random joke on page load
    getRandomRomanianJoke(false);

    // --| Prevent enter/space spam
    $("#change-emoji").keydown(function (event) {
        if (event.keyCode === 10 || event.keyCode === 13 || event.keyCode === 32) {
            event.stopPropagation();
            event.preventDefault();
        }
    });
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// --| Function to get a random romanian joke
function getRandomRomanianJoke(bShake) {
    // --| Add a fake loading text until the API responds
    if (bShake) $("#romanian-jokes").effect("shake", { times: 2 }, 300);

    $("#change-emoji").attr("disabled", true);
    $("textarea").empty();
    $("#joke-number").empty().html('<a href="#" target="_blank" onclick="return false;">Fetching...</a>');
    $("#romanian-jokes").append("Fetching a dumb joke...");
    $("#joke-category").empty().text("Category: Fetching...");

    let szJokeRetrieved = "";
    let szJokeCategory = "";
    let iJokeNumber = 0;

    // --| Randomly assign an emoji to the button
    $("#change-emoji").empty().text("Random Joke 👌" + randomCancerEmoji[Math.floor(Math.random() * randomCancerEmoji.length)]);

    // --| Wait for JSON result
    $.when($.getJSON(requestJokeFromAPI.toString(), function(data) {
        szJokeRetrieved = data.joke.toString();
        szJokeCategory = data.joketype.toString();
        iJokeNumber = parseInt(data._id);

    })).done(function () {
        // --| Result succeeded
        // --| Clear the textarea and add new freshly generated joke
        $("textarea").empty();
        $("#romanian-jokes").append(szJokeRetrieved);
        $("#joke-category").empty().text("Category: " + capitalizeFirstLetter(szJokeCategory));
        $("#change-emoji").removeAttr("disabled");

        // --| Clear the joke number div and refresh with the current number
        $("#joke-number").empty().html(`<a href="${requestJokeFromAPI}/id/${iJokeNumber}" target="_blank">Joke ID: #${iJokeNumber}</a>`);

    }).fail(function () {
        // --| Result failed
        // --| Notify the user with this custom error message
        szJokeRetrieved = "Ey, you're spamming the API, try again in 1 minute maybe?";

        // --| Clear the textarea and add new freshly generated response
        $("textarea").empty();
        $("#romanian-jokes").append(szJokeRetrieved);
        $("#change-emoji").removeAttr("disabled");

        // --| Clear the Joke ID link
        $("#joke-number").empty();
        $("#joke-category").empty().text("Category: 🤬");
    });
};
