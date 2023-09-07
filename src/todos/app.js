import html from "./app.component.html?raw";
import todoStore from "../store/todo.store";
import { TodoListCSSClass } from "../utils/constantes";
import { renderTodos } from "./use-cases";

export const App = (elementID) => {
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementID).append(app);

    todoStore.agregarListaTodosxDefecto();
    const todos = todoStore.getTodos();

    renderTodos(TodoListCSSClass, todos);
  })();
};
