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
  console.log(req.body);
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

router.delete('/:id',function( req , res){
  console.log('333333');

  Task.findById(req.params.id)
  .then(function(data){
    console.log('444444');

    Task.destroy({
      where : {
        id: req.params.id
      }
    })

  })
  .then( function ( task ) {
    console.log('5555555');
    res.json( task );
  });
});

module.exports = router;