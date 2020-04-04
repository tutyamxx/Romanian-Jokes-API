const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const https = require("https");
const rateLimit = require("express-rate-limit");
const favicon = require("serve-favicon");
const cors = require("cors");

const jokesRouter = require('./routes/api');

let app = express();

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --| Enable CORS for all requests
app.use(cors());

// --| Need this set for Heroku
app.set("trust proxy", 1);

// --| Limit the API for 100 requests per minute only
const APILimiter = rateLimit(
{
    windowMs: 60000,
    max: 100,
    message: { message: "Too many requests! Try again after 1 minute?" }
});

app.use("/api/", APILimiter);
app.use("/api/", jokesRouter);

// --| 404 Response
app.use((req, res, next) =>
{
    res.status(404).json({ message: "Sorry, can't find the page you are looking for 👀" });
});

// --| Error handler
app.use((err, req, res, next) =>
{
    // --| Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : { };
});

// --| Ping Heroku app and prevent it from sleeping every 15 minutes
setInterval(() =>
{
    https.get("https://romanian-jokes-api.herokuapp.com/api/romanianjokes/");

}, 900000);

module.exports = app;