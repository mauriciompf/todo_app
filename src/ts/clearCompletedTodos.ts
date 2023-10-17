export default function clearCompletedTodos(
  checkBoxInput: HTMLInputElement,
  todoControl: HTMLElement,
  newTodoElement: HTMLElement,
) {
  if (checkBoxInput.checked) {
    todoControl.remove();
  }

  if (newTodoElement.children.length - 2 === 0) {
    newTodoElement.classList.add("hidden");
  }
}
