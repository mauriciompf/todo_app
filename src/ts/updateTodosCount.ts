import { totalTodos, completedTodos } from "./createElement";

export default function updateTodosCount() {
  // @ts-ignore
  todos.textContent = String(totalTodos - completedTodos);
}
