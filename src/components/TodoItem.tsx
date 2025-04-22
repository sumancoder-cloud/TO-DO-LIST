import React from 'react';
import { Todo } from '../types/todo';
import {
  CheckIcon,
  TrashIcon,
  PencilIcon,
  StarIcon,
  ClockIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-3 hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            todo.completed
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-600 hover:border-blue-500'
          }`}
        >
          {todo.completed && (
            <CheckIcon className="w-4 h-4 text-white" />
          )}
        </button>
        <div className="flex-1">
          <span
            className={`${
              todo.completed ? 'line-through text-gray-500' : 'text-white'
            }`}
          >
            {todo.text}
          </span>
          {todo.notes && (
            <p className="text-sm text-gray-400 mt-1">{todo.notes}</p>
          )}
          <div className="flex items-center space-x-2 mt-1">
            {todo.dueDate && (
              <span className="flex items-center text-xs text-gray-400">
                <ClockIcon className="w-3 h-3 mr-1" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
            {todo.tags && todo.tags.length > 0 && (
              <span className="flex items-center text-xs text-gray-400">
                <TagIcon className="w-3 h-3 mr-1" />
                {todo.tags.join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            todo.priority === 'high'
              ? 'bg-red-900 text-red-200'
              : todo.priority === 'medium'
              ? 'bg-yellow-900 text-yellow-200'
              : 'bg-green-900 text-green-200'
          }`}
        >
          {todo.priority}
        </span>
        <button
          onClick={() => onEdit(todo.id)}
          className="p-1 text-gray-400 hover:text-blue-400"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 