
/**
 * Module dependencies.
 */

//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var methodOverride = require('method-override');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var hello = require('./routes/hello');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(favicon());
//app.use(express.static(path.join(__dirname, 'node_modules', 'favicon.ico')));
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(methodOverride());
app.use(express.methodOverride());
//app.use(cookieParser('Intro HCI secret key'));
app.use(express.cookieParser('Intro HCI secret key'));
//app.use(session());
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', hello.view);

app.get('/hello/:userName', hello.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
