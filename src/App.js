import { useState, useRef, useEffect } from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);

  const todoNext = useRef();

  useEffect(() => {
    const existingTodos = localStorage.getItem("todos");
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  function addTodo(event) {
    event.preventDefault();
    if (
      todoNext.current.value !== "" &&
      !todos.includes(todoNext.current.value)
    ) {
      const newTodos = [...todos, todoNext.current.value];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
    event.target.reset();
  }

  function removeTodo(toRemove) {
    const newTodos = todos.filter(function (todo) {
      return todo !== toRemove;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "2")
        .toUpperCase()
    );
  };

  console.log(randColor());
  return (
    <div className="container">
      <h2>TO-DO APP</h2>
      <form onSubmit={addTodo}>
        <input ref={todoNext} />
        <input type="submit" value="Add" />
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo}
            style={{
              backgroundColor: randColor(),
            }}
          >
            {todo}
            <button type="button" onClick={() => removeTodo(todo)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
