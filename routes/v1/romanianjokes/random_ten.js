const router = require("express").Router();
const romanianJokesFile = require("../../../jokes/romanianjokes.json");

// --| Get random 10 jokes from the file
router.get("/", (req, res, next) =>
{
    // --| Get random 10 jokes
    const randomTenJokes = romanianJokesFile.slice(0, 10).map(function () { return this.splice(Math.floor(Math.random() * this.length), 1)[0]; }, romanianJokesFile.slice());

    // --| Return 10 jokes as a JSON result
    return res.status(200).json(randomTenJokes);
});

module.exports = router;
