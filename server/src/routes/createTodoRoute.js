const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const {text, priority} = req.body;
  const todo = new TodoModel({
    text,
    completed: false,
    priority,
  })
  const newTodo = await todo.save();
  res.json(newTodo);
};
