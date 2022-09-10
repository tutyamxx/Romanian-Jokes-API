const router = require('express').Router();
const statusCode = require('../../helpers/statuscode');

// --| Default API endpoint. Check if is working :)
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => res.status(statusCode.STATUS_OK).json({ message: 'It\'s working 😃 ! Try /v1/romanianjokes or look here https://github.com/tutyamxx/Romanian-Jokes-API#usage' }));

module.exports = router;
