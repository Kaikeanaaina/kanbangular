angular.module('myApp',['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config([ '$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider){

    // $locationProvider.html5Mode({
    //   enabled:true,
    //   requireBase:false
    // });


    $routeProvider
      .when('/', {
        templateUrl : 'views/default.html',
        controller : 'ToDosController'
      })
      .when('/users/login', {
        templateUrl : 'views/login.html',
        controller : 'UserController'
      })
      .when('/users/register', {
        templateUrl : 'views/register.html',
        controller : 'UserController'
      })
      .when('users/logout', {
        templateUrl : 'views/login.html',
        controller : 'UserController'
      });
}]);