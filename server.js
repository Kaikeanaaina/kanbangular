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

app.use('/users', require('./queries/queries.js'));

app.use( express.static( './public' ));
app.use(flash());

app.use(bodyParser.urlencoded({extended:true}));

// var tasks = [
//   {
//     id: 1,
//     title: 'first',
//     prioritySelection: 'low',
//     status:'toDo',
//     created_By: 'Kai',
//     assigned_To: 'Kai'
//   },
//   {
//     id: 2,
//     title: 'second',
//     prioritySelection: 'medium',
//     status:'done',
//     created_By: 'Chaz',
//     assigned_To: 'Charles'
//   }
// ];

// app.get( '/api/tasks', function ( req, res ) {
//   res.json( tasks );
// });

// app.post( '/api/tasks', function ( req, res ) {
//   req.body.id = tasks.length+1;
//   tasks.push( req.body );
//   res.json( req.body );
// });

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