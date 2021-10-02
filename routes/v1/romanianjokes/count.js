const router = require("express").Router();
const { dbName, dbCollection, mongoCountCollectionItems } = require("../../../database/mongo_wrapper.js");

// --| Get the jokes count from our jokes database
router.get("/", async (req, res, next) => res.status(200).json({ jokes_available: await mongoCountCollectionItems(dbName, dbCollection) + 1 }));

module.exports = router;
