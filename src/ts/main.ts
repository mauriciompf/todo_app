import getElement from "./getElement";
import filterTasks from "./filter-tasks";
import toggleThemeMode from "./toggle-themeMode";
import handleAddTodo from "./handleAddTodo";
import { totalTodos, newTodoElement } from "./createElement";

const filterAllButton = getElement<HTMLButtonElement>("#filter-all");
const filterActiveButton = getElement<HTMLButtonElement>("#filter-active");
const filterCompletedButton =
  getElement<HTMLButtonElement>("#filter-completed");
const todos = getElement<HTMLSpanElement>("#todos");
const addTodoInput = getElement<HTMLInputElement>("#add-todo");

addTodoInput.addEventListener("keydown", (e) => {
  handleAddTodo(addTodoInput, newTodoElement, totalTodos, todos)(e);
});

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
