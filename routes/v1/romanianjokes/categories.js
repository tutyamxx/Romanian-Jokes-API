const router = require("express").Router();
const romanianJokesFile = require("../../../jokes/romanianjokes.json");

// --| Get all joke categories from the database and return it as a JSON response
router.get("/", (req, res, next) =>
{
    // --| Get the joke type from our jokes file
    const getJokeCategories = romanianJokesFile.filter((li, index, self) => self.map(item => item.joketype).indexOf(li.joketype) === index);

    const jokeTypes = [];
    getJokeCategories.forEach((element) => jokeTypes.push(element.joketype));

    // --| Return the joke types found by filtering as JSON result
    return res.status(200).json({ categories: jokeTypes });
});

module.exports = router;
