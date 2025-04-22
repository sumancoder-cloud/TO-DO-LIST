export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  tasksCompleted: number;
  tasksPending: number;
  productivity: number;
  joinDate: string;
  skills: string[];
  notifications: boolean;
  performanceMetrics?: PerformanceMetrics;
}

export interface PerformanceMetrics {
  averageTaskCompletionTime: number;
  onTimeDeliveryRate: number;
  qualityScore: number;
  collaborationScore: number;
  lastEvaluationDate: string;
  skillImprovements: SkillImprovement[];
}

export interface SkillImprovement {
  skill: string;
  improvement: number;
  lastUpdated: string;
}

export interface TeamStats {
  totalMembers: number;
  totalTasks: number;
  completedTasks: number;
  teamProductivity: number;
  averageTaskCompletionTime: number;
  onTimeDeliveryRate: number;
  qualityScore: number;
  collaborationScore: number;
  skillDistribution: SkillDistribution[];
}

export interface SkillDistribution {
  skill: string;
  count: number;
  percentage: number;
} 