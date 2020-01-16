const express = require("express");
const router = express.Router();

router.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const RomanianJokesFile = require("../jokes/romanianjokes.json");

router.get("/", (req, res, next) =>
{
    return res.status(200).json({ message: "It's working 😃 ! Try /api/romanianjokes or /api/romanianjokes/30/ for example" });
});

// --| Get a random Romanian joke from the database and return it as JSON response
router.get("/romanianjokes", (req, res, next) =>
{
    // --| Get a random romanian joke from our JSON file
    const GetRandomJoke = RomanianJokesFile[Math.floor(Math.random() * RomanianJokesFile.length)];

    // --| Return the joke as JSON result
    return res.status(200).json(GetRandomJoke);
});

// --| Get a random Romanian joke from the database and return it as JSON response
router.get("/romanianjokes/:id", (req, res, next) =>
{
    // --| Get the joke id specified in the parameter
    const iGetJokeID = parseInt(req.params.id);

    // --| Get the joke from our jokes file and filter it by specified parameter
    const GetSpecificJokeByID = RomanianJokesFile.filter(joke => joke.id === iGetJokeID);

    // --| Check if joke exists in our joke file
    if(!Object.keys(GetSpecificJokeByID).length)
    {
        return res.status(404).json({ message: "This joke id specified could not be found" });
    }

    // --| Return the specified joke
    return res.status(200).json(GetSpecificJokeByID);
});

module.exports = router;