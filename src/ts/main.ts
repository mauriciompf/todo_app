class TodoList {
  private addTodoInput: HTMLInputElement;
  private newTodoElement: HTMLElement;

  constructor() {
    this.addTodoInput = document.querySelector("#add-todo") as HTMLInputElement;
    this.newTodoElement = document.querySelector("#new-todo") as HTMLElement;

    this.addTodoInput.addEventListener("keydown", (e) => this.handleAddTodo(e));
  }

  private handleAddTodo(e: KeyboardEvent): void {
    if (e.key == "Enter") {
      const inputText = this.addTodoInput.value;

      const todoControl = this.createTodoElement(inputText);
      this.newTodoElement.insertBefore(
        todoControl,
        this.newTodoElement.firstChild,
      );

      this.newTodoElement.classList.remove("hidden");

      this.addTodoInput.value = "";
      e.preventDefault();
    }
  }

  private createTodoElement(todoText: string): HTMLElement {
    const todoControl = document.createElement("div");
    todoControl.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "rounded-t-md",
      "border-b",
      "border-light-theme-dark-grayish-blue",
      "bg-white",
      "px-4",
      "py-2",
      "shadow-2xl",
    );
    const span = document.createElement("span");
    span.classList.add("sr-only");
    span.textContent = "add new todo";

    const inputControl = document.createElement("div");
    inputControl.classList.add("flex", "items-center", "gap-3");

    const checkBoxInput = document.createElement("input");
    checkBoxInput.classList.add(
      "h-5",
      "w-5",
      "cursor-pointer",
      "select-none",
      "rounded-full",
      "border",
      "border-light-theme-very-light-grayish",
    );
    checkBoxInput.value = "";
    checkBoxInput.setAttribute("type", "checkbox");
    const newTodoInput = document.createElement("input");
    newTodoInput.classList.add(
      "select-none",
      "border-none",
      "px-0",
      "text-sm",
      "outline-none",
      "placeholder:text-light-theme-very-dark-grayish-blue",
      "focus:border-none",
      "focus:outline-none",
      "focus:ring-0",
    );
    newTodoInput.value = todoText;

    const button = document.createElement("button");

    const img = document.createElement("img");
    img.src = "./src/images/icon-cross.svg";
    img.alt = "Remove item";
    button.appendChild(img);
    inputControl.appendChild(span);
    inputControl.appendChild(checkBoxInput);
    inputControl.appendChild(newTodoInput);
    todoControl.appendChild(inputControl);
    todoControl.appendChild(button);

    return todoControl;
  }
}

const todoList = new TodoList();
