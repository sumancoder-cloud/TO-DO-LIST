import React, { useState, useMemo } from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // Calculate analytics
  const analytics = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const highPriority = todos.filter(todo => todo.priority === 'high').length;
    const mediumPriority = todos.filter(todo => todo.priority === 'medium').length;
    const lowPriority = todos.filter(todo => todo.priority === 'low').length;
    const overdue = todos.filter(todo => 
      todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date()
    ).length;

    return {
      total,
      completed,
      pending,
      highPriority,
      mediumPriority,
      lowPriority,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
    setDueDate(null);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string) => {
    // Implement edit functionality
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            My Tasks
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-lg font-semibold">{analytics.total}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Completed</div>
                <div className="text-lg font-semibold text-green-500">{analytics.completed}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Pending</div>
                <div className="text-lg font-semibold text-yellow-500">{analytics.pending}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Overdue</div>
                <div className="text-lg font-semibold text-red-500">{analytics.overdue}</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">High Priority</div>
            <div className="text-2xl font-bold text-red-500">{analytics.highPriority}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Medium Priority</div>
            <div className="text-2xl font-bold text-yellow-500">{analytics.mediumPriority}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Low Priority</div>
            <div className="text-2xl font-bold text-green-500">{analytics.lowPriority}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Completion Rate</div>
            <div className="text-2xl font-bold text-blue-500">{analytics.completionRate.toFixed(1)}%</div>
          </div>
        </div>

        <form onSubmit={handleAddTodo} className="mb-8">
          <div className="flex items-center space-x-3 bg-gray-800 rounded-lg p-2">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo['priority'])}
              className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              type="date"
              value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                setDueDate(date);
              }}
              className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No tasks found. Add a new task to get started!
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList; 