const express = require('express')
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

const app = express()
//middleware
app.use(cors())
app.use(express.json()) // allows us to access the req.body

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server is starting on ${PORT}`)
})

//Routes

//get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message)
  }
})

//get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    )
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    )
    res.json('Todo was updated')
  } catch (err) {
    console.error(err.message)
  }
})

//delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ])
    res.json('Todo was deleted')
  } catch (err) {
    console.error(err.message)
  }
})

//fix error 404
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client/src/index.html'))
)