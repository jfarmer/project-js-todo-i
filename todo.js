let fs = require('fs');

function newTask(description) {
  return {
    description: description,
  };
};

function addTask(list, task) {
  list.push(task);

  return list;
}

function newTodoListFromFile(fileName) {
  let list = [];
  let lines = fs.readFileSync(fileName, 'utf-8').trimRight().split('\n');

  for (let line of lines) {
    addTask(list, newTask(line));
  }

  return list;
}

function showList(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}. ${list[i].description}`);
  }
}

let todoList = newTodoListFromFile('./todos.txt');

showList(todoList);
