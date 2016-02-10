'use strict';

angular.module('myApp')
  .service('toDoService', ['$http', function ( $http ) {

    this.getToDos = function(){
      return $http.get('http://localhost:3000/api/tasks');
    };

    this.addToDos = function(todo){
      var new_todo ={
        title: todo.title,
        prioritySelection: todo.prioritySelection,
        status: 'toDo',
        created_By: todo.createdBy,
        assigned_To : todo.assignedTo
      };
      return $http.post('http://localhost:3000/api/tasks', new_todo);
    };
  }]);


//   function toDoService(){


//

//     this.getToDo = function(id){
//       return todos.filter(function(todo){
//         return this.todo.id===id;
//       })
//       .reduce(function(_,todo){
//         return todo;
//       });
//     };


//     this.changeStatus = function(todo){
//       console.log('changing');
//       console.log(todo);
//       if(todo.status==='toDo'){
//         todo.status='inProgress';
//         return todo;
//       }

//       if(todo.status==='inProgress'){
//         todo.status='done';
//         return todo;

//       }

//       if(todo.status==='done'){
//         //delete this shit
//       }
//     };

//     this.reverseStatusChange = function(todo){
//       console.log('changing');
//       console.log(todo);
//       if(todo.status==='inProgress'){
//         todo.status='toDo';
//         return todo;
//       }

//       if(todo.status==='done'){
//         todo.status='inProgress';
//         return todo;

//       }
//     };

//     // this.deleteToDo(todo){
//     //   .getToDo(todo.id)
//     // }

//   }


