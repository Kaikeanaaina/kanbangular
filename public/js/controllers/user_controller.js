'use strict';

angular.module('myApp')
.controller('UserController', ['$scope','toDoService', '$location',
  function($scope, toDoService, $location){


  $scope.registerUser = function( res,err ){

    //this is where want to make validations
    //and throw errors

    if(res){
      if(res.hasOwnProperty('username') &&
         res.hasOwnProperty('verifyUsername') &&
         res.hasOwnProperty('password') &&
         res.hasOwnProperty('verifyPassword')){


        toDoService.registerUser( res )
        .success( function ( data ) {


          $location.path('/users/login');
        });
      }

      else {
        //when they don't fill in Everything
        //error out and tell them
        // to fill in all fields
      }
    } else {
      //when they don't fill in anything
      //error out and tell them
      // to fill in the fields
    }

  };

  $scope.loginUser = function( user, err){
    if( user ){
      if(user.hasOwnProperty('username') &&
         user.hasOwnProperty('password')){
        toDoService.loginUser(user)
          .success( function ( res ) {
            $location.path('/');
          })
          .error( function ( res ) {
          });
      }
    }
  };
}]);