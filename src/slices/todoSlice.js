import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  // getting todo list
  const localTodoList = window.localStorage.getItem('todoList');
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList).map((todo) => ({
      ...todo,
      isImportant: todo.isImportant || false,
      deadline: todo.deadline || '',
      duration: todo.duration || 0,
    }));
  }
  window.localStorage.setItem('todoList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
          isImportant: action.payload.isImportant || false,
          deadline: action.payload.deadline || '',
          duration: action.payload.duration || 0,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
              isImportant: action.payload.isImportant || false,
              deadline: action.payload.deadline || '',
              duration: action.payload.duration || 0,
            },
          ])
        );
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
            todo.isImportant =
              action.payload.isImportant !== undefined
                ? action.payload.isImportant
                : todo.isImportant;
            todo.deadline = action.payload.deadline || '';
            todo.duration = action.payload.duration || 0;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
