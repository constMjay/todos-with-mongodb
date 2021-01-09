const Joi = require('joi');

const validateTodos = (todosForm) => {
    const schema = Joi.object({
        todos: Joi.string().required()
    })
    return schema.validate(todosForm)
}

module.exports = {
    validateTodos
}