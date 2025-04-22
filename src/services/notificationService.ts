import type { TeamMember } from '../types/team';

interface NotificationData {
  type: 'task_assigned' | 'task_completed' | 'task_due' | 'team_update';
  recipient: TeamMember;
  subject: string;
  message: string;
  taskId?: string;
  dueDate?: Date;
}

class NotificationService {
  private static instance: NotificationService;
  private notificationQueue: NotificationData[] = [];

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendNotification(data: NotificationData): Promise<void> {
    if (!data.recipient.notifications) return;

    // In a real application, this would integrate with an email service
    // For now, we'll simulate sending emails
    console.log('Sending email notification:', {
      to: data.recipient.email,
      subject: data.subject,
      message: data.message,
    });

    // Add to notification queue
    this.notificationQueue.push(data);

    // Simulate email sending
    await this.simulateEmailSending(data);
  }

  private async simulateEmailSending(data: NotificationData): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Remove from queue after "sending"
    this.notificationQueue = this.notificationQueue.filter(
      notification => notification !== data
    );
  }

  getNotificationQueue(): NotificationData[] {
    return this.notificationQueue;
  }

  clearNotificationQueue(): void {
    this.notificationQueue = [];
  }
}

export default NotificationService; 