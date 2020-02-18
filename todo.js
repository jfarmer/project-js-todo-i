/*
What types of objects do you need?

List out nouns and verbs involved in creating TODO lists.
Decide which nouns and verbs you want/need to model.
The nouns will be your objects and the values the functions.

Write simple functions that work on a few number of well-defined objects.

Keep the responsibilities separated as best you can:

1. Representing a real-life todo list as in-memory objects
2. Manipulating those in-memory objects
3. Reading and writing from the todos.txt file
4. Displaying information to the user
5. Rather user input and taking the appropriate actions
*/
const fs = require('fs');
let todoList = fs.readFileSync("todos.txt","utf-8");
let command = process.argv[2];
let readLineSync = require("readLine-sync");
let TODO = {};
function list() {

  if (command === "list")
  {
    console.log(todoList);
  }
}
list();
function append() {
  if (command === "append")
  {
    let newTask = readLineSync.question("What would you like to add?");
    console.log(todoList + newTask);
  }
}
append();
function delete() {
  if (command === "delete")
  {
    let deleteTask = readLineSync.question("What would you like to delete?");
    if (todoList.includes(deleteTask)) {
      for (let i =0;i<todoList.length;i++) {
        if (todoList[i] === deleteTask && todoList[i+1] === deleteTask[i+1]) {
          todoList.splice(todoList[i],deleteTask.length);
        }
      }
    }
    console.log(todoList);
  }
}
delete();
