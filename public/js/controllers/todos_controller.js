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
      console.log(res);
  };

  $scope.deleteThis=function(this_task){
    var x = this_task;
    var count = 0;
    toDoService.deleteToDo( this_task)
      .success( function (res){
        toDoService.getToDos()
          .success( function ( res ) {
            $scope.tasks = res;
          });
      });
  }

}]);