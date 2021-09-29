const router = require("express").Router();
const romanianJokesFile = require("../../../../jokes/romanianjokes.json");

// --| Get all the jokes filtered by joke type
router.get("/:joketype", (req, res, next) =>
{
    // --| Get the joke type specified in the parameter
    const paramJokeType = req.params.joketype;
    const getJokeType = romanianJokesFile.filter(joke => joke.joketype === paramJokeType);

    // --| Check if joke type exists in our joke file
    if (!Object.keys(getJokeType).length) return res.status(404).json({ message: "This joke type could not be found in the jokes list" });

    // --| Return the jokes filtered by type as JSON result
    return res.status(200).json(getJokeType);
});

router.get("/:joketype/random", (req, res, next) =>
{
    // --| Get the joke type specified in the parameter
    const paramJokeType = req.params.joketype;
    const getJokeType = romanianJokesFile.filter(joke => joke.joketype === paramJokeType);

    // --| Check if joke type exists in our joke file
    if (!Object.keys(getJokeType).length)
    {
        return res.status(404).json({ message: "This joke type could not be found in the jokes list" });
    }

    // --| Return a random joke filtered by an existing joke type
    return res.status(200).json(getJokeType[Math.floor(Math.random() * getJokeType.length)]);
});

module.exports = router;
