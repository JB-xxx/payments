var createError = require('http-errors');
var express = require('express');
var cors = require('cors')  // Jan Baars gedaan 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var budgetRouter = require('./routes/budget');  //Import routes for "budget" area of site
var usersRouter = require('./routes/users');

var compression = require('compression');
var helmet = require('helmet');

var app = express();
app.use(helmet());

//Set up mongoose connection
var mongoose = require('mongoose');
  //var mongoDB = 'mongodb+srv://Mijnvoorraad12:Devoorraad12@voorraadcluster-qwgrl.azure.mongodb.net/mijn_voorraad';
var mongoDB = 'mongodb+srv://MoneybookJan12:MoneybookGera12@baars2-kgzr1.mongodb.net/moneybook';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Klopt dit gedaan door Jan baars
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/budget', budgetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
