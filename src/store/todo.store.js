import { Todo } from "../todos/models/todo.model";

const Filters = {
  all: "All",
  completed: "Completed",
  pending: "Pending",
};

const state = {
  todos: [],
  filter: Filters.all,
};

const initStore = () => {
  console.table(state.todos);
};

const loadStore = () => {
  console.log("Load");
};

const agregarListaTodosxDefecto = () => {
  state.todos.push(
    new Todo("Estudiar programación"),
    new Todo("Crear un TODO usando React JS"),
    new Todo("Agendar cita Médica"),
    new Todo("Organizar ideas proyecto personal"),
    new Todo("Crear un portfolio")
  );
  initStore();
};

const getTodos = (filter = Filters.all) => {
  switch (filter) {
    case Filters.all:
      return [...state.todos];
    case Filters.completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

const addTodo = (description) => {
  if (!description) throw new Error("Description is required");
  state.todos.push(new Todo(description));
};

const toggleTodo = (todoID) => {
  const { todos } = state;

  const index = todos.findIndex((todo) => todo.id === todoID);
  const findTodo = todos[index];

  todos[index] = {
    ...findTodo,
    done: !findTodo.done,
  };
};

const deleteTodo = (todoID) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoID);
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done);
};

const setFilter = (filter = Filters.all) => {
  if (Filters[filter] === undefined)
    throw new Error(`${filter} is not valid filter.`);
  state.filter = filter;
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  loadStore,
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  agregarListaTodosxDefecto,
};
