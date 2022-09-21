const taskInput = document.querySelector(".task-input input");

taskBox = document.querySelector(".task-box");

// Getting Localstorage todo-lits
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo() {
  let li = "";

  if(todos){
    todos.forEach((todo, id) => {
        // If todos Is Completed set the isCompleted Value to checked
        let isCompleted = todos.status == "completed" ? "checked" : "";
        li += `<li class="task">
            <label for="${id}">
              <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
              <p class="${isCompleted}">${todo.name}</p>
            </label>
            <div class="settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                />
              </svg>
              <div class="task-menu">
                <ul>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                    <p>Edit</p>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                    <p>Delete</p>
                  </li>
                </ul>
              </div>
            </div>
          </li>`;
      });
  } 

  taskBox.innerHTML = li;
}
showTodo();

function updateStatus(selctedTask){
    let taskName = selctedTask.parentElement.lastElementChild;
    if(selctedTask.checked){
        taskName.classList.add("checked");
        // Updating the Status of selected Task To Completed
        todos[selctedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        // Updating the Status of selected Task To pending
        todos[selctedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));

}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!todos) {
      //Id todos isn't exit pass an empty array to todos
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo); //adding new task to todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});
