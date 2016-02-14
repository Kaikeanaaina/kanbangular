'use strict';

angular.module('myApp')
  .filter('statusCheck', function(){
    return function(card, status){
      return card.filter(function(task){
        return  task.status === status;
      });
    };
  });