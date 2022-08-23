const router = require('express').Router();
const loadVersion = require('../../../package.json');

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => res.status(200).json({ version: loadVersion.version }));

module.exports = router;
