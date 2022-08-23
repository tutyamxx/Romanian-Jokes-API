/* eslint-disable no-undef */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const https = require('https');
const rateLimit = require('express-rate-limit');
const favicon = require('serve-favicon');
const cors = require('cors');
const helmet = require('helmet');
const magic = require('express-routemagic');

const app = express();

const fifteenMinutesInMs = 900000;
const port = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, 'favicon.ico')));
// eslint-disable-next-line no-unused-vars
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --| Enable CORS for GET method only
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET']
};

app.use(cors(corsOptions));

// --| Need this set for Heroku
app.set('trust proxy', 1);

// --| Enable Helmet to secure the API a bit
app.use(helmet());

// --| Limit the API for 100 requests per minute only
const APILimiter = rateLimit({
    windowMs: 60000,
    max: 100,
    message: { message: 'Too many requests! Try again after 1 minute?' }
});

// --| Limit the API for 100 requests per minute only in /v1/ folder
app.use('/v1/', APILimiter);

// --| Automatic route everything in routes folder
magic.use(app, {
    routesFolder: 'routes',
    invokerPath: __dirname,
    allowSameName: true
});

// --| 404 Response
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => res.status(404).json({ message: 'Sorry, can\'t find the page you are looking for 👀' }));

// --| Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // --| Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : { };
});

// --| Log the info on server startup
// eslint-disable-next-line no-console
app.listen(port, () => process.env.NODE_ENV !== 'test' ? console.log(`🖥️  Server runs and is listening on port \x1b[34m${port}\x1b[0m.`) : '');

// --| Ping Heroku app and prevent it from sleeping every 15 minutes
setInterval(() => https.get('https://romanian-jokes-api.herokuapp.com/v1/romanianjokes/'), fifteenMinutesInMs);

module.exports = app;
