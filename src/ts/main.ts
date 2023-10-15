import getElement from "./getElement";
import filterTasks from "./filter-tasks";
import toggleThemeMode from "./toggle-themeMode";
import {
  todoControlClasses,
  checkBoxInputClasses,
  newTodoInputClasses,
  newTodoInputCompletedClasses,
} from "./elements-classes";

const addTodoInput = getElement<HTMLInputElement>("#add-todo");
const newTodoElement = getElement<HTMLElement>("#new-todo");
const todos = getElement<HTMLSpanElement>("#todos");
const clearCompletedButton = getElement<HTMLButtonElement>(
  "#clear-completed-button",
);

const filterAllButton = getElement<HTMLButtonElement>("#filter-all");
const filterActiveButton = getElement<HTMLButtonElement>("#filter-active");
const filterCompletedButton =
  getElement<HTMLButtonElement>("#filter-completed");

let totalTodos = 0;
let completedTodos = 0;

export default function createTodoElement(
  todoText: string,
  completed: boolean = false,
): HTMLElement {
  const todoControl = document.createElement("div");
  todoControl.setAttribute("id", "todo-control");
  todoControl.classList.add(...todoControlClasses);

  const span = document.createElement("span");
  span.classList.add("sr-only");
  span.textContent = "add new todo";

  const inputControl = document.createElement("div");
  inputControl.classList.add("flex", "items-center", "gap-3", "w-full");

  const checkBoxInput = document.createElement("input");
  checkBoxInput.classList.add(...checkBoxInputClasses);
  checkBoxInput.value = "";
  checkBoxInput.ariaLabel = "Check Task";
  checkBoxInput.type = "checkbox";

  checkBoxInput.addEventListener("change", () => {
    if (checkBoxInput.checked) {
      newTodoInput.classList.add(...newTodoInputCompletedClasses);
      completedTodos++;
    } else {
      newTodoInput.classList.remove(...newTodoInputCompletedClasses);
      completedTodos--;
    }

    if (completedTodos < 0) {
      completedTodos = 0;
    }

    updateTodosCount();
  });

  const newTodoInput = document.createElement("input");
  newTodoInput.classList.add(...newTodoInputClasses);
  newTodoInput.ariaLabel = "Task input";
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
  // @ts-ignore
  todos.textContent = String(totalTodos - completedTodos);
}

function handleAddTodo(
  addTodoInput: HTMLInputElement,
  newTodoElement: HTMLElement,
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      // @ts-ignore
      const inputText = addTodoInput.value.trim();

      if (inputText) {
        const todoControl = createTodoElement(inputText);
        newTodoElement.insertBefore(todoControl, newTodoElement.firstChild);

        newTodoElement.classList.remove("hidden");
        // @ts-ignore
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

const toggleButton = document.querySelector(
  "#toggle-mode",
) as HTMLButtonElement;
toggleButton.addEventListener("click", toggleThemeMode);
