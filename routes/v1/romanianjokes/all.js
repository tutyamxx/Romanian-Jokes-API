const router = require('express').Router();
const { dbName, dbCollection, mongoQueryFind } = require('../../../database/mongo_wrapper.js');
const statusCode = require('../../../helpers/statuscode.js');

// --| Get all the jokes from the database
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res, next) => {
    const allJokes = await mongoQueryFind(dbName, dbCollection, { });

    if (!allJokes.length) return res.status(statusCode.STATUS_NOT_FOUND).json({ message: 'No jokes available in the database' });

    return res.status(statusCode.STATUS_OK).json(allJokes);
});

module.exports = router;
