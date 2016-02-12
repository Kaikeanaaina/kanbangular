var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var Task = db.Task;
var bodyParser = require('body-parser');

router.use(bodyParser.json());


router.get( '/', function ( req, res ) {
  Task.findAll()
    .then( function ( tasks ) {
      res.json( tasks );
    });
  });

router.post( '/', function ( req, res ) {
  Task.create(
    {
      title: req.body.title,
      priority: req.body.priority,
      created_by: req.body.created_by,
      assigned_to : req.body.assigned_to,
      status: 'toDo'
    })
    .then( function ( tasks ) {
      res.json( tasks );
    });
  });

router.put( '/', function ( req, res ) {
  console.log(req.body);
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

module.exports = router;