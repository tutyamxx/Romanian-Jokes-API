const router = require('express').Router();
const { dbName, dbCollection, mongoCountCollectionItems } = require('../../../database/mongo_wrapper.js');
const statusCode = require('../../../helpers/statuscode.js');

// --| Get the jokes count from our jokes database
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res, next) => res.status(statusCode.STATUS_OK).json({ jokes_available: await mongoCountCollectionItems(dbName, dbCollection) + 1 }));

module.exports = router;
