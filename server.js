var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var loggedInChecker = false;
var flash = require('connect-flash');
var session = require('express-session');

var db = require('./models');
var User = db.User;
var Task = db.Task;

app.use('/users', require('./queries/users.js'));
app.use('/tasks', require('./queries/tasks.js'));

app.use( express.static( './public' ));
app.use(flash());

app.use(bodyParser.urlencoded({extended:true}));

app.get('*', function(req,res) {
 res.sendFile('/public/index.html', { root : __dirname });
});

// app.delete( '/api/tasks/:id', function( req, res){
//   deletedOne = tasks.splice(req.params.id-1,1);
//   console.log(deletedOne["0"].id);
//   res.json( deletedOne["0"].id);
// })
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
  console.log('aloha');
});

app.get('*', function(req,res) {
 res.sendFile('/public/index.html', { root : __dirname });
});

app.listen(3000,function(){
  db.sequelize.sync();
  console.log('CONNECTED');
});