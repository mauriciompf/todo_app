import updateTodosCount from "./updateTodosCount";
import { todos } from "./main";

export default function removeTask(
  todoControl: HTMLElement,
  newTodoElement: HTMLElement,
  checkBoxInput: HTMLInputElement,
  completedTodos: number,
  totalTodos: number,
) {
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

  updateTodosCount(todos);
}
