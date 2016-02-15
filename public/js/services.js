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

    this.changePriorityUp = function ( task ) {
      var updatedCard =
      {
        id : task.id,
        priority : task.priority
      };

      if( task.priority === 'LOW' ) {
        task.priority = 'MEDIUM';
      } else if( task.priority === 'MEDIUM' ) {
        task.priority = 'HIGH';
      } else if( task.priority === 'HIGH' ) {
        task.priority = 'BLOCKER';
      }
      return $http.put( 'tasks/up', updatedCard );
    };

    this.changePriorityDown = function ( task ) {
      var updatedCard =
      {
        id : task.id,
        priority : task.priority
      };

      if( task.priority === 'BLOCKER' ) {
        task.priority = 'HIGH';
      } else if( task.priority === 'HIGH' ) {
        task.priority = 'MEDIUM';
      } else if( task.priority === 'MEDIUM' ) {
        task.priority = 'LOW';
      }
      return $http.put( 'tasks/down', updatedCard );
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