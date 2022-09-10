const router = require('express').Router();
const { dbName, dbCollection, mongoAggregate, mongoQueryFind } = require('../../../database/mongo_wrapper.js');
const statusCode = require('../../../helpers/statuscode.js');

// --| Get a random Romanian joke from the database and return it as JSON object response
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res, next) => {
    // --| Get a random joke
    const pipeLine = [{ $sample: { size: 1 } }];

    return res.status(statusCode.STATUS_OK).json(Object.assign(...await mongoAggregate(dbName, dbCollection, pipeLine)));
});

// --| Get a specific joke by id
// eslint-disable-next-line no-unused-vars
router.get('/id/:id?', async (req, res, next) => {
    // --| Get the joke id specified in the parameter
    const getJokeId = parseInt(req.params.id) || 0;
    const getSpecificJokeById = await mongoQueryFind(dbName, dbCollection, { _id: getJokeId });

    // --| Check if joke exists in our database
    if (!getSpecificJokeById.length) return res.status(statusCode.STATUS_NOT_FOUND).json({ message: 'This joke id specified is not in the database' });

    // --| Return the specified joke
    return res.status(statusCode.STATUS_OK).json(Object.assign(...getSpecificJokeById));
});

module.exports = router;
