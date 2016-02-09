(function(){
  'use strict';


  function toDoService(){
    this.todos = [
      {
        id: 1,
        title: 'first',
        prioritySelection: 'low',
        status:'toDo',
        created_By: 'Kai',
        assigned_To: 'Kai'
      },
      {
        id: 2,
        title: 'second',
        prioritySelection: 'medium',
        status:'done',
        created_By: 'Chaz',
        assigned_To: 'Charles'
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
      });
    };

    this.addToDos = function(todo){
      var nextId = this.todos.length+1;
      todo.id = nextId;
      var new_todo ={
        id: nextId,
        title: todo.title,
        prioritySelection: todo.prioritySelection,
        status: 'toDo',
        created_By: todo.createdBy,
        assigned_To : todo.assignedTo
      }

      this.todos.push(new_todo);

    };

    this.changeStatus = function(todo){
      console.log('changing');
      console.log(todo);
      if(todo.status==='toDo'){
        todo.status='inProgress';
        return todo;
      }

      if(todo.status==='inProgress'){
        todo.status='done';
        return todo;

      }

      if(todo.status==='done'){
        //delete this shit
      }
    };

    this.reverseStatusChange = function(todo){
      console.log('changing');
      console.log(todo);
      if(todo.status==='inProgress'){
        todo.status='toDo';
        return todo;
      }

      if(todo.status==='done'){
        todo.status='inProgress';
        return todo;

      }
    };

    // this.deleteToDo(todo){
    //   .getToDo(todo.id)
    // }

  }

  angular.module('myApp')
    .service('toDoService', toDoService);

})();