'use strict';

angular.module('myApp')
  .service('toDoService', ['$http', function ( $http ) {

    this.getToDos = function(){
      return $http.get('http://localhost:3000/tasks');
    };

    this.addTodos = function( task ){
      console.log(task);
      var new_todo ={
        title: task.title,
        priority: task.prioritySelection,
        created_by: task.createdBy,
        assigned_to : task.assignedTo
      };
        console.log(new_todo);
      return $http.post('http://localhost:3000/tasks', new_todo);
    };

    this.deleteToDo = function(todo){
      return $http.delete('http://localhost:3000/tasks/'+todo.id);
    }

    this.changeStatus = function(todo){
      console.log('changing');
      console.log(todo);
      if(todo.status==='toDo'){
        todo.status='inProgress';
        return todo;
      }

      if(todo.status==='inProgress'){
        todo.status='done';
        return todo;
      }
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

    this.registerUser = function( user ){
      console.log('11111');
      var new_user ={
        username: user.username,
        password: user.password
      };
      //return $http.post('http://localhost:3000/users/register', new_user);
    };


  }]);
