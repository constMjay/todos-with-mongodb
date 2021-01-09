const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const todoSchema = new Schema({
    todos: {
        type: String,
        required: true
    }
});

const todosScheme = mongoose.model("Todos", todoSchema);

module.exports = todosScheme