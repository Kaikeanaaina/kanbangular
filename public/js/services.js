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
      return $http.delete('http://localhost:3000/tasks/'+todo.id);
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
      return $http.put( 'http://localhost:3000/tasks/right', updatedCard );
    };

    this.reverseStatusChange = function(task){
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
      return $http.put( 'http://localhost:3000/tasks/left', updatedCard );
    };

    this.registerUser = function( user ){
      console.log('3333333', 'touched the service', user);
      var new_user ={
        username: user.username,
        password: user.password
      };
      return $http.post('http://localhost:3000/users/register', new_user);
    };


  }]);
