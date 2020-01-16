const express = require("express");
const router = express.Router();

router.use((req, res, next) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const RomanianJokesFile = require("../jokes/romanianjokes.json");

// --| Default API endpoint. Check if is working :)
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

// --| Get all the jokes filtered by joke type
router.get("/romanianjokes/filter/:joketype", (req, res, next) =>
{
    // --| Get the joke type specified in the parameter
    const szGetJokeType = req.params.joketype;

    // --| Get the joke type from our jokes file
    const GetJokeType = RomanianJokesFile.filter(joke => joke.joketype === szGetJokeType);

    // --| Check if joke type exists in our joke file
    if(!Object.keys(GetJokeType).length)
    {
        return res.status(404).json({ message: "This joke type could not be found in the jokes list" });
    }

    // --| Return the jokes filtered by type as JSON result
    return res.status(200).json(GetJokeType);
});

// --| Get a specific joke by id
router.get("/romanianjokes/:id", (req, res, next) =>
{
    // --| Get the joke id specified in the parameter
    const iGetJokeID = parseInt(req.params.id);

    // --| Get the joke from our jokes file and filter it by specified parameter
    const GetSpecificJokeByID = RomanianJokesFile.filter(joke => joke.id === iGetJokeID);

    // --| Check if joke exists in our joke file
    if(!Object.keys(GetSpecificJokeByID).length)
    {
        return res.status(404).json({ message: "This joke id or filter specified could not be found" });
    }

    // --| Return the specified joke
    return res.status(200).json(GetSpecificJokeByID);
});

module.exports = router;