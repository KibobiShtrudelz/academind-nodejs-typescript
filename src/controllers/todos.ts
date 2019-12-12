import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoInx = TODOS.findIndex(todo => todo.id === todoId);

  if (todoInx < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS[todoInx] = new Todo(TODOS[todoInx].id, updatedText);

  res.json({ message: "Updated!", updatedTodo: TODOS[todoInx] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoInx = TODOS.findIndex(todo => todo.id === todoId);

  if (todoInx < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS.splice(todoInx, 1);

  res.json({ message: "Todo deleted!" });
};
