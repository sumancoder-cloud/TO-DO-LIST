import React, { useState, useEffect } from 'react';
import { StarIcon, FunnelIcon, ArrowsUpDownIcon, CalendarIcon, TagIcon, UserGroupIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';
import TaskService from '../services/taskService';

const Starred: React.FC = () => {
  const [starredTasks, setStarredTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('priority');
  const [groupBy, setGroupBy] = useState<'none' | 'priority' | 'dueDate' | 'assignee'>('none');
  const [showAssigneeModal, setShowAssigneeModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  // Subscribe to task updates
  useEffect(() => {
    const taskService = TaskService.getInstance();
    const unsubscribe = taskService.subscribe((tasks) => {
      setStarredTasks(tasks.filter(task => task.starred));
    });

    return () => unsubscribe();
  }, []);

  const handleTaskComplete = (taskId: string) => {
    const taskService = TaskService.getInstance();
    taskService.toggleTaskCompletion(taskId);
  };

  const handleSubtaskComplete = (taskId: string, subtaskId: string) => {
    const taskService = TaskService.getInstance();
    taskService.toggleSubtaskCompletion(taskId, subtaskId);
  };

  const handleStarToggle = (taskId: string) => {
    const taskService = TaskService.getInstance();
    taskService.toggleStarStatus(taskId);
  };

  const handleAssignTask = (taskId: string, assigneeId: string) => {
    const taskService = TaskService.getInstance();
    taskService.assignTask(taskId, assigneeId);
    setShowAssigneeModal(false);
    setSelectedTask(null);
  };

  const filteredTasks = starredTasks.filter(task => {
    if (filter === 'all') return true;
    if (!task.dueDate) return false;

    const today = new Date();
    const taskDate = new Date(task.dueDate);

    switch (filter) {
      case 'today':
        return taskDate.toDateString() === today.toDateString();
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return taskDate >= weekStart && taskDate <= weekEnd;
      case 'month':
        return taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'createdAt':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  const groupedTasks = sortedTasks.reduce((groups, task) => {
    let key = 'Other';
    switch (groupBy) {
      case 'priority':
        key = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
        break;
      case 'dueDate':
        if (task.dueDate) {
          const date = new Date(task.dueDate);
          key = date.toLocaleDateString();
        }
        break;
      case 'assignee':
        key = 'Unassigned'; // In a real app, this would use the assignee's name
        break;
      default:
        key = 'All Tasks';
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(task);
    return groups;
  }, {} as Record<string, Todo[]>);

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <StarIcon className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Starred Tasks</h1>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="createdAt">Sort by Created Date</option>
            </select>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as typeof groupBy)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">No Grouping</option>
              <option value="priority">Group by Priority</option>
              <option value="dueDate">Group by Due Date</option>
              <option value="assignee">Group by Assignee</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([group, tasks]) => (
            <div key={group} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{group}</h2>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors ${
                      task.completed ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTaskComplete(task.id)}
                            className={`p-1 rounded-full ${
                              task.completed ? 'text-green-500' : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                          <h3 className={`text-lg font-medium ${
                            task.completed ? 'line-through text-gray-500' : ''
                          }`}>
                            {task.text}
                          </h3>
                          <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        {task.notes && (
                          <p className="text-gray-400 text-sm mt-1">{task.notes}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          {task.dueDate && (
                            <div className="flex items-center text-sm text-gray-400">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex items-center text-sm text-gray-400">
                              <TagIcon className="w-4 h-4 mr-1" />
                              {task.tags.join(', ')}
                            </div>
                          )}
                        </div>
                        {task.subtasks && task.subtasks.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm text-gray-400 mb-1">
                              Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                            </div>
                            <div className="space-y-1">
                              {task.subtasks.map((subtask) => (
                                <div
                                  key={subtask.id}
                                  className="flex items-center space-x-2 text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={subtask.completed}
                                    onChange={() => handleSubtaskComplete(task.id, subtask.id)}
                                    className="form-checkbox h-4 w-4 text-blue-500"
                                  />
                                  <span className={subtask.completed ? 'text-gray-500 line-through' : ''}>
                                    {subtask.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStarToggle(task.id)}
                          className={`p-2 ${
                            task.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <StarIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setShowAssigneeModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-white"
                        >
                          <UserGroupIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Assignee Modal */}
        {showAssigneeModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Assign Task</h2>
                <button
                  onClick={() => {
                    setShowAssigneeModal(false);
                    setSelectedTask(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{selectedTask.text}</h3>
                <div className="space-y-2">
                  {/* In a real app, this would be a list of team members */}
                  <button
                    onClick={() => handleAssignTask(selectedTask.id, '1')}
                    className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    John Doe
                  </button>
                  <button
                    onClick={() => handleAssignTask(selectedTask.id, '2')}
                    className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Jane Smith
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Starred; 