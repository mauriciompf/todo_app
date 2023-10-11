const addTodoInput = document.querySelector("#add-todo") as HTMLInputElement;
const newTodoElement = document.querySelector("#new-todo") as HTMLElement;
const todos = document.querySelector("#todos") as HTMLSpanElement;
const clearCompletedButton = document.querySelector(
  "#clear-completed-button",
) as HTMLButtonElement;

function createTodoElement(todoText: string): HTMLElement {
  const todoControl = document.createElement("div");
  todoControl.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "rounded-t-md",
    "border-b",
    "border-light-theme-dark-grayish-blue",
    "bg-white",
    "px-4",
    "py-2",
    "shadow-2xl",
  );
  const span = document.createElement("span");
  span.classList.add("sr-only");
  span.textContent = "add new todo";

  const inputControl = document.createElement("div");
  inputControl.classList.add("flex", "items-center", "gap-3");

  const checkBoxInput = document.createElement("input");
  checkBoxInput.classList.add(
    "h-5",
    "w-5",
    "cursor-pointer",
    "select-none",
    "rounded-full",
    "border",
    "border-light-theme-very-light-grayish",
  );
  checkBoxInput.value = "";
  checkBoxInput.type = "checkbox";
  checkBoxInput.addEventListener("change", () => {
    if (checkBoxInput.checked) {
      newTodoInput.classList.add("line-through");
      todos.textContent = String(Number(todos.textContent) - 1);
    } else {
      newTodoInput.classList.remove("line-through");
      todos.textContent = String(Number(todos.textContent) + 1);
    }
  });

  const newTodoInput = document.createElement("input");
  newTodoInput.classList.add(
    "select-none",
    "border-none",
    "px-0",
    "text-sm",
    "outline-none",
    "placeholder:text-light-theme-very-dark-grayish-blue",
    "focus:border-none",
    "focus:outline-none",
    "focus:ring-0",
  );
  newTodoInput.value = todoText;

  const removeTodoButton = document.createElement("button");
  removeTodoButton.addEventListener("click", () => {
    todoControl.remove();
    todos.textContent = String(Number(todos.textContent) - 1);

    if (newTodoElement.children.length - 2 === 0) {
      newTodoElement.classList.add("hidden");
    }
  });

  const img = document.createElement("img");
  img.src = "./src/images/icon-cross.svg";
  img.alt = "Remove item";
  removeTodoButton.appendChild(img);
  inputControl.appendChild(span);
  inputControl.appendChild(checkBoxInput);
  inputControl.appendChild(newTodoInput);
  todoControl.appendChild(inputControl);
  todoControl.appendChild(removeTodoButton);

  clearCompletedButton.addEventListener("click", () => {
    if (checkBoxInput.checked) {
      todoControl.remove();
    }

    if (newTodoElement.children.length - 2 === 0) {
      newTodoElement.classList.add("hidden");
    }
  });

  return todoControl;
}

function handleAddTodo(
  addTodoInput: HTMLInputElement,
  newTodoElement: HTMLElement,
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      const inputText = addTodoInput.value;

      const todoControl = createTodoElement(inputText);
      newTodoElement.insertBefore(todoControl, newTodoElement.firstChild);

      newTodoElement.classList.remove("hidden");
      todos.textContent = String(newTodoElement.children.length - 2);

      addTodoInput.value = "";
      e.preventDefault();
    }
  };
}

function initTodoList() {
  addTodoInput.addEventListener(
    "keydown",
    handleAddTodo(addTodoInput, newTodoElement),
  );
}

initTodoList();
