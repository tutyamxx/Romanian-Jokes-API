const router = require("express").Router();
const { dbName, dbCollection, mongoCountCollectionItems } = require("../../../database/mongo_wrapper.js");

// --| Get the jokes count from our jokes file
router.get("/", async (req, res, next) =>
{
    // --| Get all the jokes available in the database
    const getJokesCount = await mongoCountCollectionItems(dbName, dbCollection);

    // --| Return the jokes count
    return res.status(200).json({ jokes_available: getJokesCount === 0 ? 1 : parseInt(getJokesCount) });
});

module.exports = router;
