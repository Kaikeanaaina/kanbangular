'use strict';

angular.module('myApp')
  .service('toDoService', ['$http', function ( $http ) {

    this.getToDos = function(){
      return $http.get('http://localhost:3000/tasks');
    };

    this.addTodos = function( task ){
      var new_todo ={
        title: task.title,
        priority: task.prioritySelection,
        created_by: task.createdBy,
        assigned_to : task.assignedTo
      };
      return $http.post('http://localhost:3000/tasks', new_todo);
    };

    this.deleteToDo = function(todo){
      console.log('22222222');
      return $http.delete('http://localhost:3000/api/tasks/'+todo.id);
    }

    this.changeStatus = function(todo){
      console.log('changing');
      console.log(todo);
      var updatedCard =
      {
        id : todo.id,
        status : todo.status
      };

      if(todo.status === 'toDo'){
        todo.status = 'inProgress';
      } else if(todo.status === 'inProgress'){
        todo.status = 'done';
      }
        return $http.put('http://localhost:3000/tasks', updatedCard);
    };

    this.reverseStatusChange = function(todo){
      console.log('changing');
      console.log(todo);
      if(todo.status==='inProgress'){
        todo.status='toDo';
        return todo;
      }

      if(todo.status==='done'){
        todo.status='inProgress';
        return todo;

      }
    };


  }]);
