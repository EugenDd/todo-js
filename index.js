const todoTasks = [
    {
        taskName: 'test',
        taskStatus: false
    },
    {
        taskName: 'test1',
        taskStatus: true
    }
];

const formElement = document.getElementById('todo-form');
const taskNameElement = document.getElementById('task-name');
const taskStatusElement = document.getElementById('task-status');
const todoListElement = document.getElementById('todo-list');
const todoErrorMsgElement = document.getElementById('task-name-error');

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
        <div>${taskName}</div> 
        <div>${addStatusElement(taskStatus)}</div>
    `;

    return containerElem;
}

const initTodoList = () => {
    const todoElements = todoTasks.map(addListItem);
    todoListElement.append(...todoElements);
}

const showError = () => {
    const TIMEOUT = 2000;

    const errorClassName = 'show'

    todoErrorMsgElement.classList.add(errorClassName)
    setTimeout(() => todoErrorMsgElement.classList.remove(errorClassName), TIMEOUT);
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const taskName = taskNameElement.value;
    const taskStatus = taskStatusElement.checked;

    if (!taskName) {
        showError()
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

initTodoList();
