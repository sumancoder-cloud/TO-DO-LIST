export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  tags?: string[];
  notes?: string;
  subtasks?: Subtask[];
  createdAt: Date;
  updatedAt: Date;
  reminder?: Date;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
  starred?: boolean;
  assigneeId?: string;
}

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
} 