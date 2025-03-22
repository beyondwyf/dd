'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ITodo } from '@/models/Todo';
import TodoItem from './components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      const data = await response.json();
      
      if (data.success) {
        setTodos(data.data);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (error) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!newTodo.trim()) return;
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos([data.data, ...todos]);
        setNewTodo('');
      } else {
        setError('Failed to add todo');
      }
    } catch (error) {
      setError('Error connecting to server');
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(todo => todo._id === id);
    if (!todo) return;
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      }
    } catch (error) {
      setError('Error updating todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      setError('Error deleting todo');
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12 bg-gray-100">
      <div className="max-w-lg mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-blue-600">Next.js MongoDB Todo App</h1>
        
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
            <button 
              className="ml-2 font-bold"
              onClick={() => setError('')}
            >
              ×
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add
          </button>
        </form>
        
        {loading ? (
          <div className="text-center">Loading todos...</div>
        ) : (
          <ul>
            {todos.length === 0 ? (
              <div className="text-center text-gray-500">No todos yet. Add one above!</div>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </ul>
        )}
      </div>
    </main>
  );
}
