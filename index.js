let todoTasks = [];

const formElement = document.getElementById("todo-form");
const taskNameElement = document.getElementById("task-name");
const taskStatusElement = document.getElementById("task-status");
const todoListElement = document.getElementById("todo-list");
const mainTrashSign = document.getElementById("main-trash-sign");
const searchInputElement = document.getElementById("search-input");

const isTimeToHideMainTrashSign = (lengthOfTodoTasks) => {
  if (lengthOfTodoTasks <= 1) {
    hideMainTrashSign();
  } else if (lengthOfTodoTasks >= 1) {
    showMainTrashSign();
  }
};

const filtredTodoTasks = (selectedTodoListItemId) => {
  todoTasks = todoTasks.filter(
    (todoTask) => todoTask.id != selectedTodoListItemId
  );
  isTimeToHideMainTrashSign(todoTasks.length);
  saveTodoTasksToLocalStorage(todoTasks);
};

const removeSelectedTodoListItem = (selectedTodoListItemId) => {
  for (let i = 0; i < todoListElement.children.length; i++) {
    const todoListItem = todoListElement.children[i];

    if (todoListItem.id === selectedTodoListItemId) {
      todoListItem.remove();

      filtredTodoTasks(selectedTodoListItemId);
    }
  }
};

const hideMainTrashSign = () => {
  mainTrashSign.style.visibility = "hidden";
};

const showMainTrashSign = () => {
  mainTrashSign.style.visibility = "visible";
};

const clearTodoList = () => {
  todoTasks = [];
  todoListElement.innerHTML = "";
  hideMainTrashSign();
  localStorage.clear();
};

const saveTodoTasksToLocalStorage = (todoTasks) => {
  localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
};

const showWarnMessage = () => {
  const TIMEOUT = 2000;

  const warnMessageContainer = document.querySelector(
    ".input-container-warn-message"
  );
  warnMessageContainer.classList.add("active");

  setTimeout(() => {
    warnMessageContainer.classList.remove("active");
  }, TIMEOUT);
};

const addStatusSign = (status) => {
  return `<i class="fa ${status ? `fa-check` : `fa-times`}"></i>`;
};

const createDivElement = (className, content) => {
  const divElement = document.createElement("div");
  divElement.classList.add(className);
  divElement.innerHTML = content;
  return divElement;
};

const createTodoListItem = ({ id, taskName, taskStatus }) => {
  const statusSign = addStatusSign(taskStatus);
  const trashSign = `<i class="fa fa-trash-o"></i>`;

  const todoListItem = createDivElement("todo-list-item", "");
  todoListItem.id = id;

  const statusSignElement = createDivElement("status-sign", statusSign);
  const taskElement = createDivElement("task-name", taskName);
  const trashElement = createDivElement("trash-sign", trashSign);

  todoListItem.append(statusSignElement, taskElement, trashElement);

  return todoListItem;
};

const addTaskToTodolist = ({ id, taskName, taskStatus }) => {
  const listItem = createTodoListItem({ id, taskName, taskStatus });

  todoListElement.append(listItem);
};

const renderTodoTasks = (tasks) => {
  for (const task of tasks) {
    const { id, taskName, taskStatus } = task;
    addTaskToTodolist({ id, taskName, taskStatus });
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
isTimeToHideMainTrashSign(todoTasks.length);

const resetForm = () => {
  taskNameElement.value = "";
  taskStatusElement.checked = false;
  taskNameElement.focus();
};

searchInputElement.addEventListener("input", (event) => {
  const searchValue = event.target.value;

  for (i = 0; i < todoTasks.length; i++) {
    const todoTaskName = todoTasks[i].taskName;
    const todoTaskElement = todoListElement.children[i];

    const isVisible = todoTaskName.toLowerCase().includes(searchValue)
      ? true
      : false;

    todoTaskElement.classList.toggle("hidden-todo-list-item", !isVisible);
  }
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskName = taskNameElement.value;
  const taskStatus = taskStatusElement.checked;

  if (!taskName.trim()) {
    resetForm();
    showWarnMessage();
    return;
  }

  const currentDate = new Date();
  const id = currentDate.getTime();

  const currentTask = {
    id,
    taskName,
    taskStatus,
  };

  todoTasks.push(currentTask);
  addTaskToTodolist({ id, taskName, taskStatus });
  saveTodoTasksToLocalStorage(todoTasks);
  isTimeToHideMainTrashSign(todoTasks.length);

  resetForm();
});

todoListElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash-o")) {
    const selectedTodoListItemId = event.target.parentElement.parentElement.id;

    removeSelectedTodoListItem(selectedTodoListItemId);
  }
});

mainTrashSign.addEventListener("click", clearTodoList);
