const router = require('express').Router();
const statusCode = require('../../../helpers/statuscode');
const loadVersion = require('../../../package.json');

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => res.status(statusCode.STATUS_OK).json({ version: loadVersion.version }));

module.exports = router;
