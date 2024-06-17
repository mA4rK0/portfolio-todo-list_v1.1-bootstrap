document.addEventListener("DOMContentLoaded", () => {
  // get all elements
  const inputText = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const mainList = document.getElementById("todo-list");

  //   click the add button to add a list
  addButton.addEventListener("click", addTodo);

  //   click the X button to remove a list
  mainList.addEventListener("click", deleteTodo);

  //   load the to-do list after refresh
  loadList();

  //   add a list process
  function addTodo() {
    const toDo = inputText.value.trim();

    if (toDo === "") return;

    const lI = document.createElement("li");
    lI.classList.add("border");
    lI.classList.add("border-4");
    lI.classList.add("rounded");
    lI.classList.add("mx-2");
    lI.classList.add("my-2");

    lI.innerHTML = `${toDo} <button class="rounded btn btn-outline-danger">X</button>`;
    mainList.appendChild(lI);

    saveToLocal(toDo);

    inputText.value = "";
  }

  //   save a list in the local storage
  function saveToLocal(textValue) {
    //* get the JSON Array from the local storage.
    let localStg = getLocalArray();

    //* push the localStg into the local array
    localStg.push(textValue);
    localStorage.setItem("todos", JSON.stringify(localStg));
  }

  //   remove a list process
  function deleteTodo(e) {
    if (e.target.tagName === "BUTTON") {
      const li = e.target.parentElement;
      mainList.removeChild(li);
      removeFromLocal(li.firstChild.textContent.trim());
    }
  }

  //   remove a list from the local storage
  function removeFromLocal(aList) {
    //* get the JSON Array from the local storage.
    let todos = getLocalArray();

    //* make a new array after filter
    todos = todos.filter((t) => t !== aList);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //   get the local storage
  function getLocalArray() {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  //   load the list after refresh
  function loadList() {
    const todos = getLocalArray();
    todos.forEach((todo) => {
      let lI = document.createElement("li");
      lI.classList.add("border");
      lI.classList.add("border-4");
      lI.classList.add("rounded");
      lI.classList.add("mx-2");
      lI.classList.add("my-2");

      lI.innerHTML = `${todo} <button class="rounded btn btn-outline-danger">X</button>`;
      mainList.appendChild(lI);
    });
  }
});
