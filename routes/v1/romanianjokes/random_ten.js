const router = require("express").Router();
const { dbName, dbCollection, mongoGetRandom } = require("../../../database/mongo_wrapper.js");

// --| Get random 10 jokes from the database
router.get("/", async (req, res, next) =>
{
    const pipeLine = [{ $sample: { size: 10 } }];

    // --| Return 10 jokes as a JSON result
    return res.status(200).json(await mongoGetRandom(dbName, dbCollection, pipeLine));
});

module.exports = router;
