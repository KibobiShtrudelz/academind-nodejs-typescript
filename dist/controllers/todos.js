"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../models/todo");
const TODOS = [];
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};
exports.getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoInx = TODOS.findIndex(todo => todo.id === todoId);
    if (todoInx < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS[todoInx] = new todo_1.Todo(TODOS[todoInx].id, updatedText);
    res.json({ message: "Updated!", updatedTodo: TODOS[todoInx] });
};
exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoInx = TODOS.findIndex(todo => todo.id === todoId);
    if (todoInx < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS.splice(todoInx, 1);
    res.json({ message: "Todo deleted!" });
};
