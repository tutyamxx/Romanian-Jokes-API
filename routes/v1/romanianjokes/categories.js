const router = require('express').Router();
const { dbName, dbCollection, mongoFindUnique } = require('../../../database/mongo_wrapper.js');
const statusCode = require('../../../helpers/statuscode.js');

// --| Get all joke categories from the database and return it as a JSON response
// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res, next) => res.status(statusCode.STATUS_OK).json({ categories: await mongoFindUnique(dbName, dbCollection, 'joketype') }));

module.exports = router;
