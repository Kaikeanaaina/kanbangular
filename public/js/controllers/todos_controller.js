'use strict';

angular.module('myApp')
.controller('ToDosController', ['$scope', 'toDoService',function($scope,toDoService){
  $scope.toDoService = toDoService;
}]);
