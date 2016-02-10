angular.module('myApp',['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config([ '$routeProvider',
    function ($routeProvider){

    // $locationProvider.html5Mode({
    //   enabled:true,
    //   requireBase:false
    // });


    $routeProvider
      .when('/', {
        templateUrl : 'views/default.html',
        controller : 'ToDosController'
      });
}]);