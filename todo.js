let fs = require('fs');
let process = require('process');

function newTask(description, isComplete) {
  return {
    description: description,
    isComplete: isComplete,
  };
};

function markTaskComplete(task) {
  task.isComplete = true;

  return task;
}

function addTask(list, task) {
  list.push(task);

  return list;
}

function removeTask(list, index) {
  list.splice(index, 1);

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

function saveTodoListToFile(fileName, list) {
  let lines = [];

  for (let task of list) {
    lines.push(task.description);
  }

  let content = lines.join('\n');

  fs.writeFileSync(fileName, content);
}

function showList(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}. ${list[i].description}`);
  }
}

function exitIfInvalidPosition(positionArg) {
  let position = Number(positionArg);

  if (!Number.isInteger(position)) {
    console.log(`Error: Expected task position, received '${positionArg}'`);
    return process.exit(1);
  } else if (position > todoList.length) {
    console.log(`Error: No task a position ${position}, only ${todoList.length} tasks on list`);
    return process.exit(1);
  }

  return position;
}

let command = process.argv[2];
if (command === undefined) {
  console.log('Please supply todo.js with a command');
  process.exit(1);
}

let TODO_FILE = './todos.txt'

let todoList = newTodoListFromFile(TODO_FILE);

if (command === 'list' || command === 'show') {
  showList(todoList);
} else if (command === 'add') {
  let description = process.argv[3];

  if (description === undefined) {
    console.log('Please supply a task description.');
    console.log('Example:');
    console.log('  node todo.js add "Walk the dog"');
    process.exit(1);
  }

  let task = newTask(description);

  addTask(todoList, task);

  saveTodoListToFile(TODO_FILE, todoList);
} else if (command === 'remove') {
  let position = exitIfInvalidPosition(process.argv[3]);

  removeTask(todoList, position - 1);

  saveTodoListToFile(TODO_FILE, todoList);
} else if (command === 'complete') {
  let position = exitIfInvalidPosition(process.argv[3]);

  let task = todoList[position - 1];

  markTaskComplete(task);

  if (task.isComplete) {
    console.log(`Marked '${task.description}' as complete.`);
  }
} else {
  console.log(`Unknown command: ${command}`);
}
