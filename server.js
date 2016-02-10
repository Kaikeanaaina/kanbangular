var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use( express.static( './public' ));

app.use(bodyParser.json());

var tasks = [
  {
    id: 1,
    title: 'first',
    prioritySelection: 'low',
    status:'toDo',
    created_By: 'Kai',
    assigned_To: 'Kai'
  },
  {
    id: 2,
    title: 'second',
    prioritySelection: 'medium',
    status:'done',
    created_By: 'Chaz',
    assigned_To: 'Charles'
  }
];

app.get( '/api/tasks', function ( req, res ) {
  res.json( tasks );
});

app.post( '/api/tasks', function ( req, res ) {
  req.body.id = tasks.length+1;
  tasks.push( req.body );
  res.json( req.body );
});

app.delete( '/api/tasks/:id', function( req, res){
  var deletedOne = tasks.splice(req.params.id-1,1);
  res.json( deletedOne);
})


app.listen(3000,function(){
  console.log('CONNECTED');
});