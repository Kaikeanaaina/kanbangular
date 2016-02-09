angular.module('myApp',['ngRoute']);

var myApp = angular.module('myApp');

myApp
  .config(['$routeProvider', function ($routeProvider){
    $routeProvider
      .when('/default', {
        templateUrl : 'views/default.html'
      });
}]);