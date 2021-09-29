const router = require("express").Router();
const romanianJokesFile = require("../../../jokes/romanianjokes.json");

// --| Get all the jokes from the jokes file
router.get("/", (req, res, next) => res.status(200).json(romanianJokesFile));

module.exports = router;
