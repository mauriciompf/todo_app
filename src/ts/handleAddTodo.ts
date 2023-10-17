import createTodoElement from "./createElement";
import updateTodosCount from "./updateTodosCount";

export default function handleAddTodo(
  addTodoInput: HTMLInputElement,
  newTodoElement: HTMLElement,
  totalTodos: number,
  todos: HTMLElement,
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
