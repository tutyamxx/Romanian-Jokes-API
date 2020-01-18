const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
const rateLimit = require("express-rate-limit");

const jokesRouter = require('./routes/api');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --| Need this set for Heroku
app.set('trust proxy', 1);

// --| Limit the API for 100 requests per minute only
const APILimiter = rateLimit(
{
    windowMs: 60000,
    max: 100,
    message: "Too many requests! Try again after 1 minute"
});

app.use("/api/", APILimiter);
app.use("/api/", jokesRouter);

// --| Catch 404 and forward to error handler
app.use(function(req, res, next)
{
    next(createError(404));
});

// --| Error handler
app.use(function(err, req, res, next)
{
    // --| Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // --| Render the error page
    res.status(err.status || 500);
    res.json(
    {
        message: err.message,
        error: err
    });
});

// --| Prevent Heroku app from sleeping
setInterval(() =>
{
    http.get("http://romanian-jokes-api.herokuapp.com/api/romanianjokes/");
    
}, 300000);

module.exports = app;