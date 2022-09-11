const todoTasks = [];

const formElement = document.getElementById('todo-form');
const taskNameElement = document.getElementById('task-name');
const taskStatusElement = document.getElementById('task-status');

const resetForm = () => {
    taskNameElement.value = '';
    taskStatusElement.checked = false;
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault()

    const taskName = taskNameElement.value;
    const taskStatus = taskStatusElement.checked;

    const currentTask = {
        taskName,
        taskStatus
    }

    todoTasks.push(currentTask);

    console.log('===================================================');
    console.log('todoTasks', todoTasks);
    console.log('===================================================');

    resetForm();
})

