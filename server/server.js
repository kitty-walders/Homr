var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Using requst module to make HTTP requests from the server
var request = require('request');

// API Key & username are environment variables in Heroku
var filestack = process.env.FILESTACK_API_KEY;

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var appliancesRouter = require('./routes/appliances.router');
var tasksRouter = require('./routes/tasks.router');
var intakeRouter = require('./routes/intake.router');
var homrRouter = require('./routes/homr.router');
var filestackRouter = require('./routes/filestack.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/appliances', appliancesRouter);
app.use('/tasks', tasksRouter);
app.use('/intake', intakeRouter);
app.use('/homr', homrRouter);
app.use('/filestack', filestackRouter);


// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
