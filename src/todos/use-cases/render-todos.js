import { createTodoHTML } from "./create-todo-html";

let element;

export const renderTodos = (elementId, todos) => {
  if (!element) element = document.querySelector(elementId);

  if (!element) throw new Error(`El elemento ${element} no existe`);

  element.innerHTML = "";

  todos.forEach((todo) => {
    element.append(createTodoHTML(todo));
  });
};
