const express = require("express");
const router = express.Router();

const RomanianJokesFile = require("../jokes/romanianjokes.json");

// --| Get a random Romanian joke from the database and return it as JSON response
router.get("/", function(req, res, next)
{
    // --| Get a random romanian joke from our JSON file
    const GetRandomJoke = RomanianJokesFile[Math.floor(Math.random() * RomanianJokesFile.length)];

    // --| Return the joke as JSON result
    res.status(200).json(GetRandomJoke);
});

module.exports = router;