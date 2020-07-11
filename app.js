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
      parent.remove();
    });
  }
}

function shake(smth) {
  smth.childNodes[1].classList.toggle("shake");
}
