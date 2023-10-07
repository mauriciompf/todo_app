const addTodoInput = document.querySelector("#add-todo") as HTMLInputElement;
const newTodoElement = document.querySelector("#new-todo") as HTMLElement;

addTodoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const inputValue = addTodoInput.value;

    // newTodoElement.classList.remove("hidden");

    addTodoInput.value = "";
    e.preventDefault();
  }
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

`;
