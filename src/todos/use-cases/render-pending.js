import todoStore from "../../store/todo.store";
import { Filters } from "../../utils/constantes";

let element;

export const renderPending = (elementId) => {
  if (!element) element = document.querySelector(elementId);

  if (!element) throw new Error(`Element ${elementId} not found`);

  element.innerHTML = todoStore.getTodos(Filters.pending).length;
};
