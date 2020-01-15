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
    return res.status(200).json({ message: "Try /api/romanianjokes or /api/romanianjokes/seci/ for example" });
});

// --| Get a random Romanian joke from the database and return it as JSON response
router.get("/romanianjokes", (req, res, next) =>
{
    // --| Get a random romanian joke from our JSON file
    const GetRandomJoke = RomanianJokesFile[Math.floor(Math.random() * RomanianJokesFile.length)];

    // --| Return the joke as JSON result
    return res.status(200).json(GetRandomJoke);
});

module.exports = router;