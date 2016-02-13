var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var User = db.User;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var auth = function(req, res, next){
  console.log('inside auth');
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

router.use(bodyParser.json());
app.use(flash());

router.get( '/', auth, function ( req, res ) {
User.findAll()
  .then( function ( users ) {
    res.json( users );
  });
});

// app.get('/register', function(req,res){
//   res.render('photos/register', {messages : req.flash('messages')});
// });



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
  });
});

router.route( '/loggedIn', function ( req, res ) {
  res.send( req.isAuthenticated() ? req.user : '0' );
});


router.route( '/login' )
  .get( function ( req, res ) {
    res.sendFile('../public/index.html', { root : __dirname });
  })
  .post(
    passport.authenticate('local', { failWithError: true }),
  function(req, res, next) {
    // handle success
    if (req.xhr) { return res.json({ id: req.user.id }); }
    return res.send('/');
  },
  function(err, req, res, next) {
    // handle error
    if (req.xhr) { return res.json(err); }
    return res.send('/login');
  }
);

router.route( '/logout' )
  .get( function ( req, res ) {
    req.logout();
    res.redirect( '/#/' );
  });

module.exports = router;