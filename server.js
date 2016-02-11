var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var loggedInChecker = false;

var db = require('./models');
var User = db.User;

app.use('/users', require('./queries/queries.js'));

app.use( express.static( './public' ));

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

app.get('*', function(req,res) {
 res.sendFile('/public/index.html', { root : __dirname });
});

app.listen(3000,function(){
  db.sequelize.sync();
  console.log('CONNECTED');
});