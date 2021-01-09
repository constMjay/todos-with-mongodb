window.addEventListener('DOMContentLoaded', () => {
    const todosForm = document.getElementById('todosForm');
    const todosBtnAdd = document.getElementById('todosBtnAdd');
    const formContainer = document.querySelector('.formContainer');
    const todosInput = document.getElementById('todos')
    const todosDeleteBtn = document.querySelectorAll('.todosDelete');

    /**
     * Button to display Form Todos
     */
    todosBtnAdd.addEventListener('click', () => {
        /**
         * Show the input form and remove the button add form
         */
        const result = formContainer.classList.contains('hide-form');

        if (result) {
            //Remove the hide-form class & add show-form
            formContainer.classList.remove('hide-form');
            formContainer.classList.add('show-form');
            // Remove the button add
            todosBtnAdd.parentElement.classList.remove('show-button');
            todosBtnAdd.parentElement.classList.add('hide-button');
        }
    });
    /**
     * Form Todos
     */

    todosForm.addEventListener('submit', async (e) => {
        /**
         * Prevent from reloading page
         */
        e.preventDefault();

        /**
         * Get Form Value
         */
        const todosInputValue = todosInput.value;

        try {
            //Validate the form
            if (todosInputValue.length === 0) {
                errMessage("Fill the input todos...", "alert-danger")
            } else {
                /**
                 * Hide the Form Todos
                 */
                formContainer.classList.add('hide-form');
                formContainer.classList.remove('show-form');
                /**
                 * Show the Add Todos Form Button
                 */
                todosBtnAdd.parentElement.classList.add('show-button');
                todosBtnAdd.parentElement.classList.remove('hide-button');
                todosInput.value = "" //Clear the input fields after submitting a todos

                const response = await fetch('http://localhost:3000/addTodos', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        todos: todosInputValue
                    })
                });
                // tbodyOutput.load()
                window.location.reload()
                await response.json()
            }
        } catch (error) {
            console.log("Error occured while posting todos:", error)
        }

    });

    /**
     * Delete todosList
     */
    todosDeleteBtn.forEach((todosBtn) => {
        todosBtn.addEventListener('click', async (e) => {
            try {
                /**
                 * Get the id for each table row
                 */
                const tableRowId = e.path[2].id;

                /**
                 * POST request to send the table id of each row
                 */
                window.location.reload() //Reload page after deleting
                const response = await fetch('http://localhost:3000/addTodos', {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        id: tableRowId
                    })
                })

                await response.json()
            } catch (error) {
                console.log("Request for posting the id occured error:", error)
            }
        })
    })

    /**
     * Pagination
     */

    /**
        * Set time date for todos header
        */
    todosHeaderTime()
});


/**
 * Time and Date for Todos Header
 */
const date = document.getElementById('date');
const month = document.getElementById('month');
const year = document.getElementById('year');
const dayString = document.getElementById('dayString');

function todosHeaderTime() {
    const timeDate = new Date();
    const getDate = timeDate.getDate();
    const getDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    const getMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getYear = timeDate.getUTCFullYear()

    /**
     * Set date
     */
    date.innerHTML = getDate;
    month.innerHTML = getMonth[timeDate.getMonth()];
    year.innerHTML = getYear
    dayString.innerHTML = getDay[timeDate.getDay()]
};

/**
 * Form Validation
 */
function errMessage(message, className) {
    const errMessageContainer = document.createElement('div');
    const todoBody = document.querySelector('.todoBody')
    const table = document.querySelector('.table')
    errMessageContainer.className = `${className}`;
    errMessageContainer.appendChild(document.createTextNode(message));

    /**
     * Insert the error message
     */
    todoBody.insertBefore(errMessageContainer, table)
    setTimeout(() => {
        errMessageContainer.remove();
    }, 2000)
}