var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var User = db.User;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CONFIG = require('./../config/config.js');

router.use(bodyParser.json());
app.use(flash());

app.use(session(CONFIG.SESSION));
app.use(passport.initialize());
app.use(passport.session());

router.get( '/', function ( req, res ) {
User.findAll()
  .then( function ( users ) {
    res.json( users );
  });
});

app.get('/register', function(req,res){
  res.render('photos/register', {messages : req.flash('messages')});
});



router.post('/register',function(req,res){

  console.log('444444');
  console.log(req.body);

  User.findOne({
    where:{
      username: req.body.username
    }
  })
  .then(function(data){
    if(!data){
    User.create(
      {
        username: req.body.username,
        password: req.body.password
      })
      .then( function ( user ) {
        res.redirect( '/' );
      });
    }
    else{
      req.flash('messages', 'Username taken');
      res.redirect('/register');
    }
  })
});

module.exports = router;