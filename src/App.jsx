import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";

function App() {
  let [todos, setTodos] = useState([{ id: 1, todo: "Learn React" }]);
  let [input, setInput] = useState("");

  let [editIndex, setEditIndex] = useState(-1);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        setTodos([...todos, { id: new Date().getTime(), todo: input }]);
        setInput("");
        setEditIndex(-1);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].todo = input;
        setTodos(updatedTodos);
        setEditIndex(-1);
        setInput("");
        
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover">
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-center mb-4">To Do App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a todo"
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={editIndex === -1 ? addTodo : updateTodo}
            className="bg-gradient-to-r from-blue-400 to-blue-600 py-2 px-4 rounded"
          >
            {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
          </button>
        </div>
      </div>
      {todos.length > 0 && (
        <div className="bg-gray-200 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded shadow-md mb-3"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button
                    onClick={() => setEdit(index)}
                    className="mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:to-gray-700"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:to-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
