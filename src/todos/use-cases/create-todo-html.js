export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("El elemento TODO es requerido");

  const isChecked = todo.done ? "checked" : "";
  const { id, description, done } = todo;

  const content = `    
    <div class="view">
        <input class="toggle" type="checkbox" ${isChecked}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
  `;

  const listElement = document.createElement("li");
  listElement.innerHTML = content;
  listElement.setAttribute("data-id", id);

  if (done) listElement.classList.add("completed");

  return listElement;
};
