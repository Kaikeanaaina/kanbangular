'use strict';

angular.module('myApp')
.controller('UserController', ['$scope','toDoService', '$location',function($scope, toDoService, $location){


  $scope.registerUser = function( res,err ){

    console.log('11111111');
    if(res.hasOwnProperty('username') &&
       res.hasOwnProperty('verifyUsername') &&
       res.hasOwnProperty('password') &&
       res.hasOwnProperty('verifyPassword')){

    console.log('22222');

      toDoService.registerUser( res )
      .success( function ( data ) {
        console.log('55555');
        console.log(res, 'this is the res');
        // $location.path('/');
      });


    }




  };



}]);