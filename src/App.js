import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';


function Title() {
  return (<h1>Student Hub</h1>);
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

  const handleClearTodos = async (event) => {
    await supabase.from('todos').delete().eq('complete', true);
    const { data: updatedTodos } = await supabase.from("todos").select("*");
    setTodos(updatedTodos);
  }
  
  return (
    <Row>
      <Col md={6}>
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
      </Col>
      <Col md={6}>
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

          <button type="submit" className="btn btn-secondary">
            Add Item
          </button> 
        </form>
        <br></br>
        <form onSubmit={handleClearTodos}>
          <h3 className="white-text">Clear all completed To-Do's</h3>
          <button type="submit" className="btn btn-secondary">
            Clear my completed To-Do's
          </button> 
        </form>
      </Col>
    </Row>
    
  );
}

function Schedule() {
  
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    async function getSchedule() {
      const { data: schedule } = await supabase.from("schedule").select("*");
      setSchedule(schedule);
    }
    getSchedule();
  }, []);

  const mondaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Monday")
  ).flatMap((element) => element) : [];

  const tuesdaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Tuesday")
  ).flatMap((element) => element) : [];

  const wednesdaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Wednesday")
  ).flatMap((element) => element) : [];

  const thursdaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Thursday")
  ).flatMap((element) => element) : [];

  const fridaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Friday")
  ).flatMap((element) => element) : [];

  const saturdaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Saturday")
  ).flatMap((element) => element) : [];

  const sundaySchedule = schedule ? schedule.filter((element) =>
    element.day_of_week.includes("Sunday")
  ).flatMap((element) => element) : [];

  return(
    <Row style={{paddingBottom: "30px"}}>
      <h3 className="white-text">My Schedule</h3>
      <Col md={2} className="d-flex align-items-stretch">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Monday</h5>
            {mondaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col md={2} className="d-flex align-items-stretch">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Tuesday</h5>
            {tuesdaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col md={2} className="d-flex align-items-stretch">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Wednesday</h5>
            {wednesdaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col md={2} className="d-flex align-items-stretch">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Thursday</h5>
            {thursdaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col md={2} className="d-flex align-items-stretch">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Friday</h5>
            {fridaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col md={2} className="d-flex align-items-stretch">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Saturday</h5>
            {saturdaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
            <h5 className="card-title" style={{paddingTop: "10px"}}>Sunday</h5>
            {sundaySchedule.map((classObj) => (
              <div>
                <p className="card-text"><b>{classObj.start_time.substring(0, 5)}-{classObj.end_time.substring(0, 5)}</b> {classObj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  )
}

function App() {
  return (
    <div className="App">
      <Row className="App-header">
        <Title/>
      </Row>
      <div className="content">
        <Schedule/>
        <ToDoList/>
      </div>
      
    </div>
  );
}

export default App;
