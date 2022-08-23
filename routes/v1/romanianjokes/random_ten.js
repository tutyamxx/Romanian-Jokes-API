const router = require('express').Router();
const { dbName, dbCollection, mongoAggregate } = require('../../../database/mongo_wrapper.js');

// --| Get random 10 jokes from the database
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res, next) => {
    // --| Find 10 random jokes from our database
    const pipeLine = [{ $sample: { size: 10 } }];

    // --| Return 10 jokes as a JSON result
    return res.status(200).json(await mongoAggregate(dbName, dbCollection, pipeLine));
});

module.exports = router;
