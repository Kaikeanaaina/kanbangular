'use strict';

angular.module('myApp')
.controller('ToDosController', ['$scope', 'toDoService',
  function( $scope, toDoService ){
  $scope.toDoService = toDoService;

  toDoService.getToDos()
    .success( function ( data ) {
      $scope.tasks = data;
    });

  $scope.postTodo=function(new_todo) {
    toDoService.addTodos( new_todo )
      .success( function ( res ) {
        $scope.tasks.push( res );
      });
  };

  $scope.deleteThis=function(this_task){
    console.log('11111111');
    toDoService.deleteToDo( this_task)
        .success( function (res){
         console.log(res);
        var find = $scope.tasks.filter(function(task){
          return task.id === res;
        });

         $scope.tasks.splice(find["0"].id-1,1);

        })

  }

}]);