import html from "./app.component.html?raw";
import todoStore from "../store/todo.store";
import { NewTodoInputCSSClass, TodoListCSSClass } from "../utils/constantes";
import { renderTodos } from "./use-cases";

export const App = (elementID) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(TodoListCSSClass, todos);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementID).append(app);

    todoStore.agregarListaTodosxDefecto();
    displayTodos();
  })();

  // Referencias
  const newDescriptionInput = document.querySelector(NewTodoInputCSSClass);

  // Listener
  newDescriptionInput.addEventListener("keyup", ({ key, target }) => {
    if (key !== "Enter") return;
    if (target.value.trim().length === 0) return;

    todoStore.addTodo(target.value);
    displayTodos();
    target.value = "";
  });
};
