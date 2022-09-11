const todoTasks = [];

const formElement = document.getElementById('todo-form');
const taskNameElement = document.getElementById('task-name');
const taskStatusElement = document.getElementById('task-status');
const todoListElement = document.getElementById('todo-list');

const resetForm = () => {
    taskNameElement.value = '';
    taskStatusElement.checked = false;
}
const addStatusElement = (status) => {
    return `<i class="fa ${status ? 'fa-check' : 'fa-times'}"></i>`;
};

const addListItem = ({ taskName, taskStatus }) => {
    const containerElem = document.createElement("div");
    containerElem.innerHTML = `
    <div class="todo-list-item">
        <div>${taskName}</div> 
        <div>${addStatusElement(taskStatus)}</div>
    </div>`;

    return containerElem;
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const taskName = taskNameElement.value;
    const taskStatus = taskStatusElement.checked;

    if (!taskName) {
        return
    }

    const currentTask = {
        taskName,
        taskStatus
    }

    todoTasks.push(currentTask);

    todoListElement.appendChild(addListItem(currentTask));

    resetForm();
})

