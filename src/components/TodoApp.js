import React, { useState, useEffect } from 'react';

import { TodoList, TodoForm } from '../components';
import { v4 as uuidv4 } from 'uuid';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Grid from '@material-ui/core/Grid';

const paperStyles = {
  padding: 0,
  margin: 0,
  height: '100vh',
  backgroundColor: '#fafafa',
};

const TodoApp = () => {
  const initialTodos = JSON.parse(window.localStorage.getItem('todos') || '[]');
  // const initialTodos = [
  //   { id: 1, task: 'Clean Fishtank', completed: true },
  //   { id: 2, task: 'Wash Car', completed: true },
  //   { id: 3, task: 'Grow Beard', completed: false },
  // ];
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodoText) => {
    setTodos([...todos, { id: uuidv4(), task: newTodoText, completed: false }]);
  };

  const removeTodo = (todoID) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoID);
    setTodos(updatedTodos);
  };

  const toggleTodo = (todoID) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoID ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (todoID, newTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoID ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Paper style={paperStyles} elevation={0}>
      <AppBar color="primary" position="static" style={{ height: '64px' }}>
        <Typography color="inherit">TODOS WITH HOOKS</Typography>
      </AppBar>
      <Grid container justify="center" style={{ marginTop: '1rem' }}>
        <Grid item xs={11} md={8} lg={4}>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={todos}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TodoApp;
