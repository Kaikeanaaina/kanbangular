var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var User = db.User;
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));


router.get( '/', function ( req, res ) {
User.findAll()
  .then( function ( users ) {
    res.json( users );
  });
});

router.post( '/', function (req, res ) {
User.create(
  {
    username: req.body.username,
    password: req.body.password
  })
  .then( function ( user ) {
    res.json( user );
  });
});

function registerValidation(req, res, next){

  if (req.body.username.length === 0 ||
      req.body.verifyUsername===0 ||
      req.body.password.length===0 ||
      req.body.verifyPassword===0){
    return res.send(false+  ": All fields need to be filled");
  //when sessions works put the flash
  }

  if(req.body.username !== req.body.verifyUsername){
    return res.send(false+": Username Verification doesn't match");
  //when sessions works put the flash
  }

  if(req.body.password !== req.body.verifyPassword){
    return res.send(false+ ": Password Verification does not match");
    //when sessions works put the flash
  }

  next();
}

app.post('/register',registerValidation,function(req,res){
  console.log(req.body);
});

module.exports = router;