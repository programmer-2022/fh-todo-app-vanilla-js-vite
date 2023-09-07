import { Todo } from "../todos/models/todo.model";

const Filters = {
  all: 'All',
  completed: 'Completed',
  pending: 'Pending'
}

const state = {
  todos: [
    new Todo('Tarea 1'),
    new Todo('Tarea 2'),
    new Todo('Tarea 3')
  ],
  filter: Filters.all,
}

const initStore = () => {
  console.log('InitStore', state);
}

const loadStore = () => {
  console.log('Load');
}

const getTodos = (filter = Filters.all) => {
  switch(filter) {
    case Filters.all:
      return [...state.todos];
    case Filters.completed:
      return state.todos.filter(todo => todo.done);
    case Filters.pending:
      return state.todos.filter(todo => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
}

const addTodo = (description) => {
  if(!description) throw new Error('Description is required');
  state.todos.push(new Todo(description));
}

const toggleTodo = (todoID) => {

  const index = state.todos.findIndex(todo => todo.id === todoID);
    const findTodo = state.todos[index];
    state.todos[index] = {
        ...findTodo,
        done: !findTodo.done,
    }
}

const deleteTodo = (todoID) => {
  state.todos = state.todos.filter(todo => todo.id !== todoID);
}

const deleteCompleted = () => {
  state.todos = state.todos.filter(todo => todo.done);
}

const setFilter = (filter = Filters.all) => {
  if(Filters[filter] === undefined)
    throw new Error(`${filter} is not valid filter.`);
  state.filter = filter;
}

const getCurrentFilter = () => {
  return state.filter;
}

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
}