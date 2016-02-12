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

  console.log('444444', req.body);

  User.findOne({
    where:{
      username: req.body.username
    }
  })
  .then(function(data){

    console.log('555555', data);

    if(data===null){
      console.log('666666', ' CREATING USER');
    User.create(
      {
        username: req.body.username,
        password: req.body.password
      })
      .then( function ( user ) {
        res.json( user );
      });
    }
    else{
      //if someone exists by that username
        //we want to go back to register
          //and let them know that username already exists
          //can't register that username
      console.log('ERROR 66666 username already exists');
      res.json( data);
    }
  })
});

module.exports = router;