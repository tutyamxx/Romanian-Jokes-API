const router = require("express").Router();
const { dbName, dbCollection, mongoFindUnique } = require("../../../database/mongo_wrapper.js");

// --| Get all joke categories from the database and return it as a JSON response
router.get("/", async (req, res, next) => res.status(200).json({ categories: await mongoFindUnique(dbName, dbCollection, "joketype") }));

module.exports = router;
