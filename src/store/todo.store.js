import { Todo } from "../todos/models/todo.model";
import { Filters, TodoListKey } from "../utils/constantes";

let state = {
  todos: [],
  filter: Filters.all,
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
  let newTodo = new Todo(description);
  state.todos.push(newTodo);
  saveTodoToLocalStorage(TodoListKey, state.todos);
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
  saveTodoToLocalStorage(TodoListKey, state.todos);
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
};

const setFilter = (filter = Filters.all) => {
  state.filter = filter;
};

const getCurrentFilter = () => {
  return state.filter;
};

const saveTodoToLocalStorage = (keyValue, payload) => {
  localStorage.setItem(keyValue, JSON.stringify(payload));
};

const getTodosFromLocalStorage = (keyValue) => {
  const data = localStorage.getItem(keyValue);

  if (!data) return;

  const todo = JSON.parse(localStorage.getItem(keyValue));
  state.todos = todo;
};

export default {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  getTodosFromLocalStorage,
};
