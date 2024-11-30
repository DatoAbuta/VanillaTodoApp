const myForm = document.getElementById("myForm");
const todoInput = document.getElementById("todoInput");
const todoUl = document.getElementById("todoUl");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

if (todos.length > 0) {
  scriptToHtml(todos);
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newTodo = todoInput.value;

  if (newTodo.trim() !== "") {
    const newObj = {
      text: newTodo,
      completed: false,
      time: new Date().toLocaleTimeString(),
    };

    todos.push(newObj);
    localStorage.setItem("todos", JSON.stringify(todos));
    scriptToHtml(todos);
    todoInput.value = "";
  }
});

function scriptToHtml(todo) {
  todoUl.innerHTML = "";
  todo.forEach((todo, index) => {
    let dateP = document.createElement("p");
    dateP.textContent = todo.time;

    let li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";

    let completedBtn = document.createElement("button");
    completedBtn.textContent = "completed";

    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      scriptToHtml(todos);
    });

    completedBtn.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      localStorage.setItem("todos", JSON.stringify(todos));
      scriptToHtml(todos);
    });

    todoUl.appendChild(li);
    todoUl.appendChild(deleteBtn);
    todoUl.appendChild(completedBtn);
    todoUl.appendChild(dateP);
  });
}
