import './App.css'
import InputTodo from './components/InputTodo'
import ListTodos from './components/ListTodos'

function App() {
  return (
    <div className="App">
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </div>
  )
}

export default App
