import { newTodoInputCompletedClasses } from "./elements-classes";
import updateTodosCount from "./updateTodosCount";

export default function updateTodoStatus(
  checkBoxInput: HTMLInputElement,
  newTodoInput: HTMLInputElement,
  completedTodos: number,
) {
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
}
