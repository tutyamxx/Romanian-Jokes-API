const router = require('express').Router();
const { dbName, dbCollection, mongoQueryFind, mongoAggregate } = require('../../../../database/mongo_wrapper.js');
const statusCode = require('../../../../helpers/statuscode.js');

// --| Get all the jokes filtered by joke type
// eslint-disable-next-line no-unused-vars
router.get('/:joketype?', async (req, res, next) => {
    // --| Get the joke type specified in the parameter
    const paramJokeType = req.params.joketype;
    const getJokeType = await mongoQueryFind(dbName, dbCollection, { joketype: paramJokeType });

    // --| Check if joke type exists in our database
    if (!getJokeType.length) return res.status(statusCode.STATUS_NOT_FOUND).json({ message: 'This joke type could not be found in the database' });

    // --| Return the jokes filtered by type as JSON result
    return res.status(statusCode.STATUS_OK).json(getJokeType);
});

// eslint-disable-next-line no-unused-vars
router.get('/:joketype/random', async (req, res, next) => {
    // --| Get the joke type specified in the parameter
    const paramJokeType = req.params.joketype;

    // --| Find a random joke from the database and filter it by joketype
    const pipeLine = [
        { $match: { joketype: paramJokeType } },
        { $sample: { size: 1 } }
    ];

    const getJokeType = await mongoAggregate(dbName, dbCollection, pipeLine);

    // --| Check if joke type exists in our database
    if (!getJokeType.length) return res.status(statusCode.STATUS_NOT_FOUND).json({ message: 'This joke type could not be found in the database' });

    // --| Return a random joke filtered by an existing joke type
    return res.status(statusCode.STATUS_OK).json(Object.assign(...getJokeType));
});

module.exports = router;
