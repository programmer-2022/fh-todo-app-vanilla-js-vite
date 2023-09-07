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

  // Referencias HTML
  const newDescriptionInput = document.querySelector(NewTodoInputCSSClass);
  const todoListUL = document.querySelector(TodoListCSSClass);

  // InputText Listener
  newDescriptionInput.addEventListener("keyup", ({ key, target }) => {
    if (key !== "Enter") return;
    if (target.value.trim().length === 0) return;

    todoStore.addTodo(target.value);
    displayTodos();
    target.value = "";
  });

  // Toggle Listener - Delete TODO
  todoListUL.addEventListener("click", ({ target }) => {
    const tagNameElement = target.tagName.toLowerCase();

    // Cambiar de estado al elemento actual (toggle)
    if (tagNameElement === "input" || tagNameElement === "label") {
      const parentElement = target.closest("[data-id]");
      const todoId = parentElement.getAttribute("data-id");
      todoStore.toggleTodo(todoId);
      displayTodos();
    }

    // Boton eliminar TODO
    const parentElement = target.closest("[data-id]");
    if (!parentElement || tagNameElement !== "button") return;

    let deleteConfirm = confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );

    if (deleteConfirm) {
      const todoId = parentElement.getAttribute("data-id");
      todoStore.deleteTodo(todoId);
      displayTodos();
    }
  });
};
