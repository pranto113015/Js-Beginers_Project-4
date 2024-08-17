// fine html element
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");



// showmessage function define (ES6 javascript format)
// reuse able function to changing color status
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = ""; //affter 1s the message is empty
        messageElement.classList.remove(`bg-${status}`);
    }, 1000)
}



// createTodo function define (ES6 javascript format)
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");// list design
    todoElement.innerHTML =
        `
     <span>${todoValue}</span>
     <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
    `;

    todoLists.appendChild(todoElement);

    // fine delete button element
    const deleteButton = todoElement.querySelector("#deleteButton");

    // add listner of delete button and function call
    deleteButton.addEventListener("click", deleteTodo);

};

// deleteTodo funciton define (ES6 javascript format)
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;//identify the list

    // remove the list
    todoLists.removeChild(selectedTodo);

    // delate message show
    showMessage("todo is deleted", "danger");


    // check the localstorage matching the id and delete
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    // those id doesn't match they are again store the localstorage
    localStorage.setItem("mytodos", JSON.stringify(todos));

};



// getTodosFromLocalStorage function define (ES6 javascript format)
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
};



// addTodo function define (ES6 javascript format)
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value; //input value store the variable


    // unique id generation funcion
    const todoId = Date.now().toString();

    // createTodo functon call
    createTodo(todoId, todoValue);

    // showmessage function call
    showMessage("todo is added", "success");

    // add todos local storage and check if any data here
    const todos = getTodosFromLocalStorage();

    // data push in array
    todos.push({ todoId, todoValue });

    //array store the localstorage
    localStorage.setItem("mytodos", JSON.stringify(todos));

    // after store the data then input field is empty
    todoInput.value = "";
};


// loadTodos function define (ES6 javascript format)
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));//show one by one from localstorage
}


// adding listeners and addTofo function call
todoForm.addEventListener("submit", addTodo);


// every time refresh the window all localstorage data show the window
// adding lister and function call
window.addEventListener("DOMContentLoaded", loadTodos);