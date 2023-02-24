const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
// reference our new custom controllers
const employers = require('./controllers/employers');
const cities = require('./controllers/cities');
const auth = require('./controllers/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use dotenv to read .env file with config vars
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

// mongodb connection using mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
.then((res) => {
  console.log('Connected to MongoDB');
})
.catch(() => {
  console.log('Connection to MongoDB Failed');
});

// passport auth config
const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}));

// start passport w/session support
app.use(passport.initialize());
app.use(passport.session())

const User = require('./models/user');
passport.use(User.createStrategy());

// read / write session vars
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// map all requests at /employers to our own employers.js controller
app.use('/employers', employers);
app.use('/cities', cities);
app.use('/auth', auth);

// add hbs extension function to select the correct dropdown option when editing
const hbs = require('hbs');
hbs.registerHelper('selectOption', (currentValue, selectedValue) => {
  let selectedProperty = '';
  if (currentValue == selectedValue) {
    selectedProperty = ' selected';
  }
  return new hbs.SafeString(`<option${selectedProperty}>${currentValue}</option>`);
});

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
