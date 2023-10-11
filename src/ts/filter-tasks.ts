export default function filterTasks(filterType: string) {
  const todoControls = document.querySelectorAll("#todo-control");
  todoControls.forEach((todoControl) => {
    const checkBox = todoControl.querySelector(
      "input[type='checkbox'",
    ) as HTMLInputElement;
    if (
      filterType === "all" ||
      (filterType === "active" && !checkBox.checked) ||
      (filterType === "completed" && checkBox.checked)
    ) {
      todoControl.classList.remove("hidden");
    } else {
      todoControl.classList.add("hidden");
    }
  });
}
