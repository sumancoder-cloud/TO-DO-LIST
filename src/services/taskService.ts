import { Todo } from '../types/todo';

class TaskService {
  private static instance: TaskService;
  private tasks: Todo[] = [];
  private listeners: ((tasks: Todo[]) => void)[] = [];

  private constructor() {
    // Initialize with some tasks
    this.tasks = [
      {
        id: '1',
        text: 'Complete project proposal',
        completed: false,
        priority: 'high',
        dueDate: new Date('2024-02-20'),
        tags: ['work', 'important'],
        notes: 'Need to include budget estimates',
        subtasks: [
          { id: '1-1', text: 'Research market trends', completed: false },
          { id: '1-2', text: 'Prepare presentation', completed: false },
        ],
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        reminder: new Date('2024-02-19'),
        repeat: 'none',
        starred: true,
        assigneeId: undefined,
      },
      {
        id: '2',
        text: 'Review team performance',
        completed: false,
        priority: 'medium',
        dueDate: new Date('2024-02-25'),
        tags: ['team', 'review'],
        notes: 'Schedule 1:1 meetings',
        subtasks: [],
        createdAt: new Date('2024-02-16'),
        updatedAt: new Date('2024-02-16'),
        reminder: new Date('2024-02-24'),
        repeat: 'none',
        starred: true,
        assigneeId: undefined,
      },
    ];
  }

  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  // Subscribe to task updates
  subscribe(listener: (tasks: Todo[]) => void) {
    this.listeners.push(listener);
    // Initial call with current tasks
    listener(this.tasks);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of task updates
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.tasks));
  }

  // Get all starred tasks
  getStarredTasks(): Todo[] {
    return this.tasks.filter(task => task.starred);
  }

  // Toggle task completion
  toggleTaskCompletion(taskId: string) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    );
    this.notifyListeners();
  }

  // Toggle subtask completion
  toggleSubtaskCompletion(taskId: string, subtaskId: string) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks?.map(subtask =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            ),
            updatedAt: new Date(),
          }
        : task
    );
    this.notifyListeners();
  }

  // Toggle star status
  toggleStarStatus(taskId: string) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, starred: !task.starred, updatedAt: new Date() }
        : task
    );
    this.notifyListeners();
  }

  // Assign task
  assignTask(taskId: string, assigneeId: string) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, assigneeId, updatedAt: new Date() }
        : task
    );
    this.notifyListeners();
  }

  // Add new task
  addTask(task: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTask: Todo = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks = [...this.tasks, newTask];
    this.notifyListeners();
  }

  // Update task
  updateTask(taskId: string, updates: Partial<Todo>) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    );
    this.notifyListeners();
  }

  // Delete task
  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.notifyListeners();
  }
}

export default TaskService; 