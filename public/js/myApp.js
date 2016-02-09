angular.module('myApp',['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config(['$routeProvider', '$locationProvider', function ($routeProvider,$locationProvider){

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });


    $routeProvider
      .when('/', {
        templateUrl : 'views/default.html',
        controller : 'ToDosController'
      });
}]);