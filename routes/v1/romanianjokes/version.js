const router = require("express").Router();
const loadVersion = require("../../../package.json");

router.get("/", (req, res, next) => res.status(200).json({ version: loadVersion.version }));

module.exports = router;
