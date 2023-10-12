export default function filterTasks(
  filterType: string,
  filterButton: HTMLButtonElement,
) {
  const filterButtons = document.querySelectorAll("#filter-options button");
  const todoControls = document.querySelectorAll("#todo-control");
  todoControls.forEach((todoControl) => {
    const checkBox = todoControl.querySelector(
      "input[type='checkbox']",
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

  filterButtons.forEach((btn) => {
    if (btn === filterButton) {
      btn.classList.add("text-blue-500");
      btn.classList.remove("hover:text-gray-600", "focus:text-gray-600");
    } else {
      btn.classList.remove("text-blue-500");
      btn.classList.add("hover:text-gray-600", "focus:text-gray-600");
    }
  });
}
