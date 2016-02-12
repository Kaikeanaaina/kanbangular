'use strict';

angular.module('myApp')
.controller('UserController', ['$scope','toDoService', '$location',function($scope, toDoService, $location){


  $scope.registerUser = function( res,err ){

    //this is where want to make validations
    //and throw errors
    console.log('111111', res);

    if(res){
      console.log('data received','222222', res);
      if(res.hasOwnProperty('username') &&
         res.hasOwnProperty('verifyUsername') &&
         res.hasOwnProperty('password') &&
         res.hasOwnProperty('verifyPassword')){

        console.log('22222', res);

        toDoService.registerUser( res )
        .success( function ( data ) {

          console.log('777777', data);

          $location.path('/users/login');
        });
      }

      else {
        //when they don't fill in Everything
        //error out and tell them
        // to fill in all fields
        console.log('ERROR 2222, did not get through the validations');
      }
    } else {
      //when they don't fill in anything
      //error out and tell them
      // to fill in the fields
      console.log('ERROR 1111, there was no data');
    }

  };

  $scope.loginUser = function(res, err){
    console.log('1111111', res);

    if(res){
      console.log('222222', res);
      if(res.hasOwnProperty('username') &&
         res.hasOwnProperty('password')){
        console.log('33333', res)

      toDoService.loginUser(res)



      }
      else{
        console.log('ERROR 33333', 'Fill in All Fields');
      }
    }
    else{
      console.log('ERROR 22222', 'Fill in any fields');
    }










  }



}]);