var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var User = db.User;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var auth = function(req, res, next){
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

router.use(bodyParser.json());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done){
    var user = null;

    User.findOne({
      username : username
    })
    .then(function(data){
      user = data;
      if(!user){
        return done(new Error('User not found.'), false);
      }
      bcrypt.compare(password, user.password, function(err, matches){
        // if err...;

        if(matches === false){
          // this is when passwords dont match
          return done(new Error('Invalid Password'));
        }
        if(matches === true){
          return done(null, user);
        }
      });
    });
  }
));



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
  User.findOne({
    where:{
      username: req.body.username
    }
  })
  .then(function(data){


    if(data===null){


      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      User.create({
        username : req.body.username,
        password : hash
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
      res.json( new Error('username already exists'));
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