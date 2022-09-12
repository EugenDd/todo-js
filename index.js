let todoTasks = [];

const formElement = document.getElementById("todo-form");
const taskNameElement = document.getElementById("task-name");
const taskStatusElement = document.getElementById("task-status");
const todoListElement = document.getElementById("todo-list");
const deleteBtn = document.getElementById("delete-btn");

const clearTodoList = () => {
  todoTasks = [];
  todoListElement.innerHTML = "";
  localStorage.clear();
};

const saveTodoTasksToLocalStorage = () => {
  localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
};

const showWarnMessage = () => {
  const warnMessageContainer = document.querySelector(
    ".input-container-warn-message"
  );
  warnMessageContainer.classList.add("active");

  setTimeout(() => {
    warnMessageContainer.classList.remove("active");
  }, 2000);
};

const addStatusSign = (status) => {
  return `<i class="fa ${status ? `fa-check` : `fa-times`}"></i>`;
};

const createToDoListItem = ({ taskName, taskStatus }) => {
  const statusSign = addStatusSign(taskStatus);

  const todoListItem = document.createElement("div");
  todoListItem.classList.add("todo-list-item");

  const statusSignElement = document.createElement("div");
  statusSignElement.innerHTML = statusSign;

  const taskElement = document.createElement("div");
  taskElement.innerHTML = taskName;

  todoListItem.append(statusSignElement);
  todoListItem.append(taskName);

  return todoListItem;
};

const addTaskToTodolist = ({ taskName, taskStatus }) => {
  const listItem = createToDoListItem({ taskName, taskStatus });

  todoListElement.append(listItem);
};

const renderTodoTasks = (tasks) => {
  for (const task of tasks) {
    const { taskName, taskStatus } = task;
    addTaskToTodolist({ taskName, taskStatus });
  }
};

const updateTodoTasks = (extractedTasks) => {
  for (task of extractedTasks) {
    todoTasks.push(task);
  }
};

const extractTodoTasksFromLocalStorage = () => {
  const todoTasksFromLocalStorage = JSON.parse(
    localStorage.getItem("todoTasks")
  );
  if (todoTasksFromLocalStorage) {
    const extractedTasks = todoTasksFromLocalStorage;
    updateTodoTasks(extractedTasks);
    renderTodoTasks(todoTasks);
  }
};

extractTodoTasksFromLocalStorage();

const resetForm = () => {
  taskNameElement.value = "";
  taskStatusElement.checked = false;
};

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskName = taskNameElement.value;
  const taskStatus = taskStatusElement.checked;

  if (!taskName.trim()) {
    taskNameElement.value = "";
    taskNameElement.focus();
    showWarnMessage();
    return;
  }

  const currentDate = new Date();
  const id = currentDate.getTime();

  // filter

  const currentTask = {
    // id,
    taskName,
    taskStatus,
  };

  todoTasks.push(currentTask);
  addTaskToTodolist({ taskName, taskStatus });
  saveTodoTasksToLocalStorage();

  resetForm();
});

deleteBtn.addEventListener("click", clearTodoList);
