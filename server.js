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


app.get('*', function(req,res) {
 res.sendFile('/public/index.html', { root : __dirname });
});

app.listen(3000,function(){
  db.sequelize.sync();
  console.log('CONNECTED');
});