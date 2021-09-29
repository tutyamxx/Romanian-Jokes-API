const router = require("express").Router();
const romanianJokesFile = require("../../../jokes/romanianjokes.json");

// --| Get a random Romanian joke from the database and return it as JSON response
router.get("/", (req, res, next) => res.status(200).json(romanianJokesFile[Math.floor(Math.random() * romanianJokesFile.length)]));

// --| Get a specific joke by id
router.get("/id/:id?", (req, res, next) =>
{
    // --| Get the joke id specified in the parameter
    const getJokeId = parseInt(req.params.id) || 0;

    // --| Get the joke from our jokes file and filter it by specified parameter
    const getSpecificJokeById = romanianJokesFile.filter(joke => joke.id === getJokeId);

    // --| Check if joke exists in our joke file
    if (!Object.keys(getSpecificJokeById).length) return res.status(404).json({ message: "This joke id or filter specified could not be found" });

    // --| Return the specified joke
    return res.status(200).json(getSpecificJokeById);
});

module.exports = router;
