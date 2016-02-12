'use strict';

angular.module('myApp')
.controller('ToDosController', ['$scope', 'toDoService',
  function( $scope, toDoService ){
  $scope.toDoService = toDoService;

  $scope.tasks =[];
  toDoService.getToDos()
    .success( function ( res ) {
      $scope.tasks = res;
    });

  $scope.postTodo=function( res ) {
    toDoService.addTodos( res )
      .success( function ( res ) {
        $scope.tasks.push( res );
      });
  };

  $scope.deleteThis=function(this_task){
    toDoService.deleteToDo( this_task)
      .success( function (res){
        toDoService.getToDos()
          .success( function ( res ) {
            $scope.tasks = res;
          });
      });
  };

}]);