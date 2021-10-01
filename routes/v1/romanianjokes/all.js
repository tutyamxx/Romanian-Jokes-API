const router = require("express").Router();
const { dbName, dbCollection, mongoQueryFind } = require("../../../database/mongo_wrapper.js");

// --| Get all the jokes from the database
router.get("/", async (req, res, next) => {
    const allJokes = await mongoQueryFind(dbName, dbCollection, { });

    if (!allJokes.length) return res.status(404).json({ message: "No jokes available in the database" });

    return res.status(200).json(allJokes);
});

module.exports = router;
