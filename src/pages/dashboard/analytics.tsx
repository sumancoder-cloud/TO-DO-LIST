import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/todo';

const AnalyticsDashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Calculate analytics
  const analytics = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    highPriority: todos.filter(todo => todo.priority === 'high').length,
    mediumPriority: todos.filter(todo => todo.priority === 'medium').length,
    lowPriority: todos.filter(todo => todo.priority === 'low').length,
    overdue: todos.filter(todo => 
      todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date()
    ).length,
    completionRate: todos.length > 0 ? (todos.filter(todo => todo.completed).length / todos.length) * 100 : 0
  };

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  // Calculate percentages for progress bars
  const totalPriority = analytics.highPriority + analytics.mediumPriority + analytics.lowPriority;
  const highPriorityPercent = totalPriority > 0 ? (analytics.highPriority / totalPriority) * 100 : 0;
  const mediumPriorityPercent = totalPriority > 0 ? (analytics.mediumPriority / totalPriority) * 100 : 0;
  const lowPriorityPercent = totalPriority > 0 ? (analytics.lowPriority / totalPriority) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Total Tasks</h3>
            <p className="text-3xl font-bold">{analytics.total}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-blue-500">{analytics.completionRate.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Overdue Tasks</h3>
            <p className="text-3xl font-bold text-red-500">{analytics.overdue}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Pending Tasks</h3>
            <p className="text-3xl font-bold text-yellow-500">{analytics.pending}</p>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Task Priority Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>High Priority</span>
                  <span>{analytics.highPriority} ({highPriorityPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${highPriorityPercent}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Medium Priority</span>
                  <span>{analytics.mediumPriority} ({mediumPriorityPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${mediumPriorityPercent}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Low Priority</span>
                  <span>{analytics.lowPriority} ({lowPriorityPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${lowPriorityPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Completion Status */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Task Completion Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Completed</span>
                  <span>{analytics.completed} ({analytics.completionRate.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${analytics.completionRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Pending</span>
                  <span>{analytics.pending} ({(100 - analytics.completionRate).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${100 - analytics.completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Detailed Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="text-gray-400 text-sm mb-2">High Priority</h4>
              <p className="text-2xl font-bold text-red-500">{analytics.highPriority}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm mb-2">Medium Priority</h4>
              <p className="text-2xl font-bold text-yellow-500">{analytics.mediumPriority}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm mb-2">Low Priority</h4>
              <p className="text-2xl font-bold text-green-500">{analytics.lowPriority}</p>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm mb-2">Completed Tasks</h4>
              <p className="text-2xl font-bold text-blue-500">{analytics.completed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 