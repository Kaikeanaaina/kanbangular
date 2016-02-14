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

  $scope.changeStatusRight = function ( task ) {
    toDoService.changeStatus( task )
      .success( function () {});
  };

  $scope.changeStatusLeft = function ( task ) {
    toDoService.reverseChangeStatus( task )
      .success( function () {});
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