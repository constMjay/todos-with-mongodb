const express = require('express');
const router = express.Router();
const todosScheme = require('../model/todos');
const { validateTodos } = require('../services/validation')


router.get("/addTodos", async (req, res) => {
    const { page, limit } = req.query;
    const allTodos = await retrieveTodos();
    const todos = [...allTodos]
    /**
     * This is for pagination
     */
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = parseInt(page) * parseInt(limit)

    const result = {}

    /**
     * Next Todos Result
     */
    if (endIndex < allTodos.length) {
        result.next = {
            page: parseInt(page) + 1,
            limit: parseInt(limit)
        };
    }

    /**
     * Previous Todos Result
     */
    if (startIndex > 0) {
        result.previous = {
            page: parseInt(page) - 1,
            limit: parseInt(limit)
        }
    }

    result.resultTodos = todos.splice(startIndex, endIndex)
    res.send(result.resultTodos)
})


/**
 * CRUD OPERATIONS
 */
router.get('/todos', async (req, res) => {
    const todosList = await retrieveTodos()

    /**
     * This is for pagination
     */

    // res.send(result)
    res.render('index', { todos: todosList })
});
router.post('/addTodos', async (req, res) => {
    const { todos } = req.body

    const addTodos = new todosScheme({
        todos: todos
    });
    try {
        /**
         * Validate the form if error is true return 404 status
         */
        const { error } = validateTodos(req.body)
        if (error) return res.status(404).send(error.details[0].message)

        const result = await addTodos.save()
        res.status(200).send({ message: "Adding todos successfuly", data: result })
    } catch (error) {
        console.log("Error occured while creating a todos:", error)
    }
});
router.delete('/addTodos', async (req, res) => {
    const { id } = req.body;

    try {
        await todosScheme.findByIdAndDelete(id)
    } catch (error) {
        console.log("Deleting todos has error occured:", error)
    }
})
const retrieveTodos = async () => {
    try {
        return await todosScheme.find()
    } catch (error) {
        console.log("Retrieving Todos Error:", error)
    }
}


module.exports = router