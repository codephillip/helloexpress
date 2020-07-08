var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:MtrNgyVrBr9t!Zp@hellomongo1.sgxho.gcp.mongodb.net/test?authSource=admin&replicaSet=atlas-nypn2j-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
mongoose.connect((mongoDB, {useNewUrlParser: true}));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var timeMiddleWare = (req, res, next) => {
  req.timeObject = Date.now();
  next();
}

// middleware with no mount point called when any request is made
app.use((req, res, next) => {
  console.log('any endpoint called');
});

// middleware with mount point on /test called everytime any request is made
app.use('/test', (req, res, next) => {
  console.log('test endpoint called');
  next();
});

app.use(timeMiddleWare)
app.use('/', indexRouter);
app.use('/test', indexRouter);
app.use('/tests', indexRouter);
app.use('/test3', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // if anything is passed to the next().
    // Node assumes an error has occured and will stop execution of proceeding code
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
