var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var loggedInChecker = false;
var flash = require('connect-flash');
var session = require('express-session');
var CONFIG = require('./config/config.js');

var db = require('./models');
var User = db.User;
var Task = db.Task;

app.use(session(CONFIG.SESSION));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( function ( user, done ) {
  return done( null, user );
});

passport.deserializeUser( function ( user, done ) {
  return done( null, user );
});

app.use('/users', require('./queries/users.js'));
app.use('/tasks', require('./queries/tasks.js'));

app.use( express.static( './public' ));
app.use(flash());

app.use(bodyParser.urlencoded({extended:true}));

passport.use( new LocalStrategy(
  function ( username, password, done ) {
    db.User.findOne({
      where : {
        username : username,
        password : password
      }
    })
    .then(function ( user, err ) {
      if( err ) {
        throw err;
      }
      else if( user ) {
        return done( null, user);
      }
      else {
        return done( null, false );
      }
    });
  }
));

app.get('*', function(req,res) {
  res.sendFile('/public/index.html', { root : __dirname });
});

app.listen(3000,function(){
  db.sequelize.sync();
  console.log('CONNECTED');
});