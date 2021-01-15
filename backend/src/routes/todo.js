const express = require('express');
const router = express.Router();
const todosScheme = require('../model/todos');
const { validateTodos } = require('../services/validation')



/**
 * CRUD OPERATIONS
 */
// router.get('/', async (req, res) => {
//     const todosList = await retrieveTodos()


//     // res.send(result)
//     res.render('index', { todos: todosList })
// });
router.get('/', (req, res) => {
    res.redirect('/1')
})

router.get('/:page', async (req, res, next) => {
    /**
     * Pagination
     */
    const limitPerPage = 5;
    const page = req.params.page || 1;

    await todosScheme
        .find()
        .skip((limitPerPage * page) - limitPerPage)
        .limit(limitPerPage)
        .exec((err, todos) => {
            todosScheme.countDocuments().exec((err, count) => {
                if (err) return next(err)
                res.render('todos', {
                    todos: todos,
                    currentPage: page,
                    pages: Math.ceil(count / limitPerPage)
                })
            })
        })
})
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


module.exports = router