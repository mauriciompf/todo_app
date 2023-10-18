import { totalTodos, completedTodos } from "./createTodoElement";

export default function updateTodosCount(todos: HTMLElement) {
  // @ts-ignore
  todos.textContent = String(totalTodos - completedTodos);
}
