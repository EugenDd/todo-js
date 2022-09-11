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

const validateTaskNameInputField = () => {
  return taskNameElement.value.trim() ? true : showWarnMessage();
};

const addStatusSign = (status) => {
  return status
    ? `<i class="fa fa-check" aria-hidden="true"></i>`
    : `<i class="fa fa-times" aria-hidden="true"></i>`;
};

const addToTodolist = (currentTask) => {
  const task = currentTask.taskName;
  const status = currentTask.taskStatus;

  const statusSign = addStatusSign(status);
  todoListElement.innerHTML += `
    <div class="todo-list-item">
        <div>${statusSign}</div>
        <div>${task}</div> 
    </div>`;
};

const renderTodoTasks = (tasks) => {
  for (const task of tasks) {
    addToTodolist(task);
  }
};

const extractTodoTasksFromLocalStorage = () => {
  const todoTasksFromLocalStorage = JSON.parse(
    localStorage.getItem("todoTasks")
  );
  if (todoTasksFromLocalStorage) {
    todoTasks = todoTasksFromLocalStorage;
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

  if (validateTaskNameInputField()) {
    const taskName = taskNameElement.value;
    const taskStatus = taskStatusElement.checked;

    const currentTask = {
      taskName,
      taskStatus,
    };

    todoTasks.push(currentTask);
    addToTodolist(currentTask);
    saveTodoTasksToLocalStorage();

    resetForm();
  }
});

deleteBtn.addEventListener("click", clearTodoList);
