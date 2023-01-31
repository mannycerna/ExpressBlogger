//instantiate standar lib 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//setup router for each set of routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//instantiate the actual express app
const app = express();

// view engine setup
//set application settings (things we can access across the app)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//associate libraries with the app
//adding middleware
//adding libraries that can we can use througout out app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//for hosting static files: css, html, images etc.
app.use(express.static(path.join(__dirname, 'public')));


//we bind (associate) the routers to the route in our application
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
