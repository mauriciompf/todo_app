import filterTasks from "./filter-tasks";

const addTodoInput = document.querySelector("#add-todo") as HTMLInputElement;
const newTodoElement = document.querySelector("#new-todo") as HTMLElement;
const todos = document.querySelector("#todos") as HTMLSpanElement;
const clearCompletedButton = document.querySelector(
  "#clear-completed-button",
) as HTMLButtonElement;

const filterAllButton = document.querySelector(
  "#filter-all",
) as HTMLButtonElement;
const filterActiveButton = document.querySelector(
  "#filter-active",
) as HTMLButtonElement;
const filterCompletedButton = document.querySelector(
  "#filter-completed",
) as HTMLButtonElement;

let totalTodos = 0;
let completedTodos = 0;

export default function createTodoElement(
  todoText: string,
  completed: boolean = false,
): HTMLElement {
  const todoControl = document.createElement("div");
  todoControl.setAttribute("id", "todo-control");
  todoControl.classList.add(
    "group",
    "flex",
    "items-center",
    "justify-between",
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
  inputControl.classList.add("flex", "items-center", "gap-3", "w-full");

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
      newTodoInput.classList.add("line-through", "text-gray-300");
      completedTodos++;
    } else {
      newTodoInput.classList.remove("line-through", "text-gray-300");
      completedTodos--;
    }

    if (completedTodos < 0) {
      completedTodos = 0;
    }

    updateTodosCount();
  });

  const newTodoInput = document.createElement("input");
  newTodoInput.classList.add(
    "cursor-pointer",
    "w-full",
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
  removeTodoButton.classList.add(
    "hidden",
    "group-hover:block",
    "group-focus:block",
  );
  removeTodoButton.addEventListener("click", () => {
    todoControl.remove();

    if (newTodoElement.children.length - 2 === 0) {
      newTodoElement.classList.add("hidden");
    }

    if (checkBoxInput.checked) {
      completedTodos--;
    }

    totalTodos--;
    if (totalTodos < 0) {
      totalTodos = 0;
    }

    updateTodosCount();
  });

  const img = document.createElement("img");
  img.classList.add("select-none");
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

  if (completed) {
    checkBoxInput.checked = true;
    completedTodos++;
  }

  return todoControl;
}

function updateTodosCount() {
  todos.textContent = String(totalTodos - completedTodos);
}

function handleAddTodo(
  addTodoInput: HTMLInputElement,
  newTodoElement: HTMLElement,
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      const inputText = addTodoInput.value.trim();

      if (inputText) {
        const todoControl = createTodoElement(inputText);
        newTodoElement.insertBefore(todoControl, newTodoElement.firstChild);

        newTodoElement.classList.remove("hidden");
        todos.textContent = String(newTodoElement.children.length - 2);
        totalTodos++;
        updateTodosCount();

        addTodoInput.value = "";
        e.preventDefault();
      }
    }
  };
}

addTodoInput.addEventListener(
  "keydown",
  handleAddTodo(addTodoInput, newTodoElement),
);

filterAllButton.addEventListener("click", () => {
  filterTasks("all", filterAllButton);
});

filterActiveButton.addEventListener("click", () => {
  filterTasks("active", filterActiveButton);
});

filterCompletedButton.addEventListener("click", () => {
  filterTasks("completed", filterCompletedButton);
});
