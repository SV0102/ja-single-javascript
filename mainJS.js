const addTaskButt = document.getElementById('add-task-button');
const listVar = document.getElementById('task-list');
const inputTask = document.getElementById('input-task');
let currTaskVal;
let taskList = [];

function now() {
    let date = new Date();
    return date.getTime()
}
function localStoring(taskList) {
    let stringified = JSON.stringify(taskList);
    localStorage.setItem('tasks', stringified);
}
function stoReturn(){
    let parsed = JSON.parse(localStorage.getItem('tasks'));
    if (Array.isArray(parsed)) {
        return parsed;
    }
    return [];
}
function reWritten() {
    localStoring(taskList);
}

window.addEventListener('beforeunload', () => {
    /*reWritten();*/
});
window.addEventListener('load', () => {
    taskList = stoReturn();
    render();
});

// Making of structure of added strings
function renderer([currentValue, checked, timeStamp]){
    const liElement = document.createElement('li');
    const inElement = document.createElement('input');
    const spElement = document.createElement('span');
    const btnElement = document.createElement('button');
    inElement.setAttribute('type', 'checkbox')
    spElement.setAttribute('id', timeStamp);
    inElement.checked = checked;
    inElement.classList.add('marked');
    spElement.classList.add('task');
    spElement.innerText = currentValue;
    spElement.classList.toggle('task_1', checked);
    btnElement.classList.add('delete-btn');
    btnElement.innerText = 'DELETE';
    liElement.classList.add('to-do-item');
    liElement.append(inElement, spElement, btnElement);
    listVar.append(liElement);
    inputTask.value = '';
}

// Function, which renders the list of tasks
function render() {
    listVar.innerHTML = '';
    for (currTaskVal in taskList){
        renderer(taskList[currTaskVal]);
    }
}

render();

// Event handler process the pressing of 'Add task' button
// and forbids input of empty strings
addTaskButt.addEventListener('click', (e) => {
    if (inputTask.value.length !== 0){
        taskList.push([inputTask.value, false, now()]);
        render();
        localStoring(taskList);
    }
})

// event handler handles the pressing of checkbox and delete button
listVar.addEventListener('click', (e)=>{
    const currTaskSp = e.target.closest(".to-do-item").querySelector(".task");
    console.log(parseInt(currTaskSp.id));
    const currTaskInd = taskList.findIndex(e => e[2] === parseInt(currTaskSp.id));
    if (e.target.classList.contains('marked')) {
        console.log(taskList[currTaskInd][1]);
        taskList[currTaskInd][1] = !taskList[currTaskInd][1];
        render();
        localStoring(taskList);
    }
    else if (e.target.classList.contains('delete-btn')){
        taskList.splice(currTaskInd, 1);
        render();
        localStoring(taskList);
    }
})






