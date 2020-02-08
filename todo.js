function newTask(description) {
  return {
    description: description,
  };
};

function addTask(list, task) {
  list.push(task);

  return list;
}

let todoList = [
  newTask('Walk the dog'),
  newTask('Bake a cake'),
  newTask('Wash the car'),
];

addTask(todoList, newTask('Write a song'));

console.log(todoList);
