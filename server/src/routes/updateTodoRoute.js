const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const todo = await TodoModel.findByID(id);
    todo.completed = req.body.completed;
    todo.text = req.body.text;
    await todo.save();
    res.json(todo);
}