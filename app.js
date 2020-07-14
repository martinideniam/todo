/* selectors */
const todoContainer = document.querySelector(".todo-container");
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const logo = document.querySelector("#logo-text");
const logoMobile = document.querySelector("#logo-text-mobile");

/* event listeners */
todoButton.addEventListener("click", addTodoItem);
todoContainer.addEventListener("click", checkOrDelete);
logo.addEventListener("click", nightMode);
logoMobile.addEventListener("click", nightMode);
document.addEventListener("DOMContentLoaded", openLocalTodos);

/* functions */
function addTodoItem(event) {
  event.preventDefault();
  /* div for one todo*/
  if (todoInput.value.trimStart() != "") {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    /* todo text*/
    const todoItemText = document.createElement("h2");
    todoItemText.innerText = todoInput.value.trimStart();
    saveLocalTodos(todoItemText.innerText);
    todoInput.value = "";
    todoItemText.classList.add("todo-item-text");
    /* to do buttons 
        <div class="todo-item">
          <h2 class="todo-item-text">Hey</h2>
          <button><i class="fas fa-check"></i></button>
          <button><i class="fas fa-minus"></i></button>
        </div>
    */
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("checkB");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-minus'></i>";
    deleteButton.classList.add("deleteB");

    todoItem.appendChild(todoItemText);
    todoItem.appendChild(checkButton);
    todoItem.appendChild(deleteButton);

    todoContainer.appendChild(todoItem);
  } else {
    shake(todoButton);
  }
}

function checkOrDelete(event) {
  console.log(event.target);
  const parent = event.target.parentElement;
  if (event.target.classList[0] == "checkB") {
    parent.classList.toggle("check");
  } else if (event.target.classList[0] == "deleteB") {
    parent.classList.toggle("delete");
    parent.addEventListener("transitionend", function () {
      deleteLocalTodos(parent.innerText);
      parent.remove();
    });
  }
}

function shake(smth) {
  smth.childNodes[1].classList.toggle("shake");
}

/* Night mode */
function nightMode(event) {
  var options = {
    bottom: "32px", // default: '32px'
    right: "unset", // default: '32px'
    left: "32px", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#fff", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: false, // default: true,
    label: "", // default: ''
    autoMatchOsTheme: true, // default: true
  };
  const darkmode = new Darkmode(options);
  darkmode.toggle();
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function openLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todoItemTextToOpen) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const todoItemText = document.createElement("h2");
    todoItemText.innerText = todoItemTextToOpen;
    todoItemText.classList.add("todo-item-text");
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("checkB");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-minus'></i>";
    deleteButton.classList.add("deleteB");

    todoItem.appendChild(todoItemText);
    todoItem.appendChild(checkButton);
    todoItem.appendChild(deleteButton);

    todoContainer.appendChild(todoItem);
  });
}

function deleteLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  console.log(todo);
  const index = todos.indexOf(todo);
  if (index > -1) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
