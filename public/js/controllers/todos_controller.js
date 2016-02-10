'use strict';

angular.module('myApp')
.controller('ToDosController', ['$scope', 'toDoService',
  function( $scope, toDoService ){
  $scope.toDoService = toDoService;

  toDoService.getToDos()
    .success( function ( data ) {
      $scope.tasks = data;
    });

  $scope.addTodos=function(new_todo) {
    console.log('8===D{()}');
    toDoService.addTodos( todo )
      .success( function ( response ) {
        console.log(response);
        $scope.tasks.push( todo );
      });
  };

}]);
