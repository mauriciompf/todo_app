import updateTodoStatus from "./updateTodoStatus";
import removeTask from "./removeTask";
import getElement from "./getElement";
import clearCompletedTodos from "./clearCompletedTodos";
import {
  todoControlClasses,
  checkBoxInputClasses,
  newTodoInputClasses,
} from "./elements-classes";

export let totalTodos = 0;
export let completedTodos = 0;
const clearCompletedButton = getElement<HTMLButtonElement>(
  "#clear-completed-button",
);
export const newTodoElement = getElement<HTMLElement>("#new-todo");

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
    updateTodoStatus(checkBoxInput, newTodoInput, completedTodos);
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
    removeTask(
      todoControl,
      newTodoElement,
      checkBoxInput,
      completedTodos,
      totalTodos,
    );
  });

  clearCompletedButton.addEventListener("click", () => {
    clearCompletedTodos(checkBoxInput, todoControl, newTodoElement);
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

  if (completed) {
    checkBoxInput.checked = true;
    completedTodos++;
  }

  return todoControl;
}
