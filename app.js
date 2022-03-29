var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catatanRouter =  require('./app/catatan/router')
const adminRouter = require('./app/admin/router')
const dashboard = require('./app/dashboard/router')

const catatanApiRouter = require('./app/catatan/api/catatan/router')
const adminApiRouter = require('./app/admin/api/auth/router')
const flash = require('connect-flash')

const methodOverride = require('method-override')

var app = express();

app.use(
  "/admin-lte",
  express.static(path.join(__dirname, "/admin-lte"))
);

app.use(
  session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {},
  })
);
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride("method"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/dashboard', dashboard);
app.use('/users', usersRouter);
app.use('/catatan',catatanRouter)

//api
app.use('/api/v1/',adminApiRouter)
app.use('/api/v1/catatan',catatanApiRouter)


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
