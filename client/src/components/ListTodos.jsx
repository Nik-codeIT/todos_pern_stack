import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo'

const ListTodos = () => {
  const [todos, setTodos] = useState([])

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      })
      setTodos(todos.filter((todo) => todo.todo_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  const getTodos = async () => {
    const res = await fetch('http://localhost:5000/todos')
    const todoArray = await res.json()
    setTodos(todoArray)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="head">Description</th>
            <th className="head">Edit</th>
            <th className="head">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td className="desc">{todo.description}</td>
              <td className="desc">
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListTodos
