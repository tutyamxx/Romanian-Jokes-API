const router = require("express").Router();
const { dbName, dbCollection, mongoQueryFind, mongoAggregate } = require("../../../../database/mongo_wrapper.js");

// --| Get all the jokes filtered by joke type
router.get("/:joketype?", async (req, res, next) => {
    // --| Get the joke type specified in the parameter
    const paramJokeType = req.params.joketype;
    const getJokeType = await mongoQueryFind(dbName, dbCollection, { joketype: paramJokeType });

    // --| Check if joke type exists in our database
    if (!getJokeType.length) return res.status(404).json({ message: "This joke type could not be found in the database" });

    // --| Return the jokes filtered by type as JSON result
    return res.status(200).json(getJokeType);
});

router.get("/:joketype/random", async (req, res, next) => {
    // --| Get the joke type specified in the parameter
    const paramJokeType = req.params.joketype;

    // --| Find a random joke from the database and filter it by joketype
    const pipeLine = [
        { $match: { joketype: paramJokeType } },
        { $sample: { size: 1 } }
    ];

    const getJokeType = await mongoAggregate(dbName, dbCollection, pipeLine);

    // --| Check if joke type exists in our database
    if (!getJokeType.length) return res.status(404).json({ message: "This joke type could not be found in the database" });

    // --| Return a random joke filtered by an existing joke type
    return res.status(200).json(Object.assign(...getJokeType));
});

module.exports = router;
