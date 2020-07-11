/* selectors */
const todoContainer = document.querySelector(".todo-container");
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");

/* event listeners */
todoButton.addEventListener("click", addTodoItem);
todoContainer.addEventListener("click", checkOrDelete);

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
    checkButton.classList.add("check");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-minus'></i>";
    deleteButton.classList.add("delete");

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
  console.log(event.target.parentElement);
  if (event.target.classList[0] == "check") {
    console.log("checked");
  } else {
    event.target.parentElement.remove();
  }
  /* I have to find out to bypass i element when pressing the buttons */
}

function shake(smth) {
  smth.childNodes[1].classList.toggle("shake");
}
