const router = require("express").Router();

// --| Default API endpoint. Check if is working :)
router.get("/", (req, res, next) => res.status(200).json({ message: "It's working 😃 ! Try /api/romanianjokes or look here https://github.com/tutyamxx/Romanian-Jokes-API#usage" }));

module.exports = router;
