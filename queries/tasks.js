var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var Task = db.Task;
var bodyParser = require('body-parser');

router.use(bodyParser.json());

var auth = function(req, res, next){
  console.log('inside auth');
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};


router.get( '/', function ( req, res ) {
  console.log('========', req.user );
  Task.findAll()
    .then( function ( tasks ) {
      res.json( tasks );
    });
  });

router.post( '/', auth, function ( req, res ) {
  Task.create(
    {
      title: req.body.title,
      priority: req.body.priority,
      created_by: req.body.created_by,
      assigned_to : req.body.assigned_to,
      status: 'toDo',
      UserId: req.user.id
    })
    .then( function ( tasks ) {
      res.json( tasks );
    });
  });

router.put( '/right', auth, function ( req, res ) {
  if( req.body.status === 'toDo' ) {
    req.body.status = 'inProgress';
  } else if(req.body.status === 'inProgress') {
    req.body.status = 'done';
  }
  Task.update(
    {
      status : req.body.status
    },
    {
      where : { id : req.body.id }
    })
  .then( function ( tasks ) {
    res.json( tasks );
  });
});

router.put( '/left', auth, function ( req, res ) {
  if( req.body.status === 'done' ) {
    req.body.status = 'inProgress';
  } else if(req.body.status === 'inProgress') {
    req.body.status = 'toDo';
  }
  Task.update(
    {
      status : req.body.status
    },
    {
      where : { id : req.body.id }
    })
  .then( function ( tasks ) {
    res.json( tasks );
  });
});

router.delete('/:id', auth, function( req , res){
  Task.findById(req.params.id)
  .then(function(data){
    return Task.destroy({
      where : {
        id: req.params.id
      }
    });
  })
  .then( function ( task ) {
    res.json( 'card '+ req.params.id + ' deleted' );
  });
});

module.exports = router;