var express = require('express');
var app = express();
var router = express.Router();
var db = require('./../models');
var Task = db.Task;
var bodyParser = require('body-parser');

router.use(bodyParser.json());

var auth = function(req, res, next){
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};


router.get( '/', function ( req, res ) {
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
      created_by: req.user.username,
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
    res.sendStatus( 200 );
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
    res.sendStatus( 200 );
  });
});

router.put( '/up', auth, function ( req, res ) {
  if( req.body.priority === 'LOW' ) {
    req.body.priority = 'MEDIUM';
  } else if( req.body.priority === 'MEDIUM' ) {
    req.body.priority = 'HIGH';
  } else if( req.body.priority === 'HIGH' ) {
    req.body.priority = 'BLOCKER';
  }
  Task.update(
  {
    priority : req.body.priority
  },
  {
    where : { id : req.body.id }
  })
  .then( function (tasks ) {
    res.sendStatus( 200 );
  });
});

router.put( '/down', auth, function ( req, res ) {
  if( req.body.priority === 'BLOCKER' ) {
    req.body.priority = 'HIGH';
  } else if( req.body.priority === 'HIGH' ) {
    req.body.priority = 'MEDIUM';
  } else if( req.body.priority === 'MEDIUM' ) {
    req.body.priority = 'LOW';
  }
  Task.update(
  {
    priority : req.body.priority
  },
  {
    where : { id : req.body.id }
  })
  .then( function (tasks ) {
    res.sendStatus( 200 );
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