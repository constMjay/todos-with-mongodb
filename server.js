const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')
const cors = require('cors')
const app = express();
dotenv.config();

/**
 * Import Routes
 */
const todosRoutes = require('./backend/src/routes/todo');

/**
 * Mongodb Mongoose Connection
 */
mongoose.connect(process.env.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("Connected to database!"))
    .catch(err => console.log("Connecting to database has error occured:", err))
/**
* View engine setup & Setup public folder
*/
app.set('views', path.join(__dirname, 'backend/src/views'));
app.set('view engine', 'ejs');
app.use("/static", express.static(path.join(__dirname, "frontend/static")));

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/**
 * Routes
 */
app.use('/', todosRoutes)


app.listen(process.env.PORT, (req, res) => {
    console.log("Listening on port:", process.env.PORT)
})

