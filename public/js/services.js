(function(){
  'use strict';


  function toDoService(){
    this.todos = [
      {
        id: 1,
        title: 'first',
        prioritySelection: 'low',
        status:'toDo',
        created_By: 'Kai'
      },
      {
        id: 2,
        title: 'second',
        prioritySelection: 'medium',
        status:'toDo',
        created_By: 'Kai',
      }
    ];


    this.getToDos = function(){
      return this.todos;
    };

    this.getToDo = function(id){
      return todos.filter(function(todo){
        return this.todo.id===id;
      })
      .reduce(function(_,todo){
        return todo;
      })
    };

    this.addToDos = function(todo){
      console.log(todo);
      var nextId = this.todos.length+1;
      todo.id = nextId;
      this.books.push({
        id: nextId,
        title: todo.title,
        prioritySelection: todo.prioritySelection,
        status: 'toDo',
        created_By: 'kai',
      });
    }

  }

  angular.module('myApp')
    .service('toDoService', toDoService);

})();