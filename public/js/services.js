'use strict';

angular.module('myApp')
  .service('toDoService', ['$http', function ( $http ) {

    this.getToDos = function(){
      return $http.get('/tasks');
    };

    this.addTodos = function( task ){
      var new_todo ={
        title: task.title,
        priority: task.prioritySelection,
        created_by: task.createdBy,
        assigned_to : task.assignedTo
      };
      return $http.post('/tasks', new_todo);
    };

    this.deleteToDo = function(todo){
      return $http.delete('/tasks/'+todo.id);
    }

    this.changeStatus = function ( task ) {
      var updatedCard =
      {
        id : task.id,
        status : task.status
      };

      if( task.status === 'toDo' ) {
        task.status = 'inProgress';
      } else if( task.status === 'inProgress' ) {
        task.status = 'done';
      }
      return $http.put( '/tasks/right', updatedCard );
    };

    this.reverseChangeStatus = function(task){
      var updatedCard =
      {
        id : task.id,
        status : task.status
      };

      if( task.status === 'done' ) {
        task.status = 'inProgress';
      } else if( task.status === 'inProgress' ) {
        task.status = 'toDo';
      }
      return $http.put( '/tasks/left', updatedCard );
    };

    this.registerUser = function( user ){
      var new_user ={
        username: user.username,
        password: user.password
      };
      return $http.post('/users/register', new_user);
    };

    this.loginUser = function(user){
      return $http.post('/users/login', user);
    };

    this.logoutUser = function ( user ){
      return $http.get( '/users/logout', user);
    };
  }]);