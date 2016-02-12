'use strict';

angular.module('myApp')
.controller('UserController', ['$scope','toDoService',function($scope, toDoService){

  $scope.registerUser = function( res ){
    console.log(res);
    // toDoService.registerUser( res )
    // .success( function ( res ) {
    //   console.log('2222');
    // });
  };



}]);