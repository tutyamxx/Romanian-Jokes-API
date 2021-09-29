const router = require("express").Router();
const romanianJokesFile = require("../../../jokes/romanianjokes.json");

// --| Get the jokes count from our jokes file
router.get("/", (req, res, next) =>
{
    // --| Get all the jokes available in the jokes file
    const GetJokesCount = Object.keys(romanianJokesFile).length + 1;

    // --| Return the jokes count
    return res.status(200).json({ jokes_available: GetJokesCount === 0 ? 1 : parseInt(GetJokesCount) });
});

module.exports = router;
