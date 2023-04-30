import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';


function Title() {
  return (<h1>Student To-Do List</h1>);
}

function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from("todos").select("*");
      setTodos(todos);
    }
    getTodos();
  }, []);

  const handleCheckboxChange = async (id) => {
    const updatedTodos = todos.map((todo) =>
    {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(updatedTodos);

    await supabase
      .from("todos")
      .update({ complete: updatedTodos.find((todo) => todo.id === id).complete })
      .match({ id: id });
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();

    const newTodoItem = event.target.elements.todoItem.value;

    const newTodo = {
      item: newTodoItem,
      complete: false
    };

    await supabase.from("todos").insert([
      {
        item: newTodo.item,
        complete: newTodo.complete
      },
    ]);

    const { data: updatedTodos } = await supabase.from("todos").select("*");
    setTodos(updatedTodos);

    event.target.reset();
  };
  
  return (
    <div>
      <h3 className="white-text">My To-Do's</h3>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <div className="form-check">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
                id = {todo.id}
                checked={todo.complete}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <label
                className={"form-check-label " + (todo.complete ? "text-decoration-line-through" : "")}
                htmlFor={todo.id}
              >
                {todo.item}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <br></br>
      <form onSubmit={handleAddTodo}>
        <h3 className="white-text">Add a To-Do</h3>
        <div className="mb-3">
          <label htmlFor="todoItem" className="form-label text-white">
            To-Do Item
          </label>
          <input
            type="text"
            className="form-control"
            id="todoItem"
            name="todoItem"
            required
            placeholder="Enter task description"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Item
        </button> 
      </form>

    </div>
    
  );
}

function App() {
  return (
    <div className="App">
      <Row className="App-header">
        <Title/>
      </Row>
      <Row>
        <Col md={6}>
          <ToDoList/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
