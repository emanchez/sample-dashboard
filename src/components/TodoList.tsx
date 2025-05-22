'use client'
import { useState, useEffect } from 'react'

const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input])
      setInput("")
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-3">To-Do List</h3>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span>{todo}</span>
            <button 
              onClick={() => setTodos(todos.filter((_, i) => i !== index))}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList