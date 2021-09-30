const router = require("express").Router();
const { dbName, dbCollection, mongoGetRandom, mongoQueryFind } = require("../../../database/mongo_wrapper.js");

// --| Get a random Romanian joke from the database and return it as JSON object response
router.get("/", async (req, res, next) =>
{
    // --| Get a random joke
    const pipeLine = [{ $sample: { size: 1 } }];

    return res.status(200).json(Object.assign(...await mongoGetRandom(dbName, dbCollection, pipeLine)));
});

// --| Get a specific joke by id
router.get("/id/:id?", async (req, res, next) =>
{
    // --| Get the joke id specified in the parameter
    const getJokeId = parseInt(req.params.id) || 0;
    const getSpecificJokeById = await mongoQueryFind(dbName, dbCollection, { _id: getJokeId });

    // --| Check if joke exists in our database
    if (!getSpecificJokeById.length) return res.status(404).json({ message: "This joke id specified is not in the database" });

    // --| Return the specified joke
    return res.status(200).json(Object.assign(...getSpecificJokeById));
});

module.exports = router;
