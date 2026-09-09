export interface AdminNotification {
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: string;
  metadata: Record<string, unknown>;
}

export const validateAdminNotification = (
  notification: Partial<AdminNotification>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!notification.title) errors.push('Title is required');
  if (!notification.message) errors.push('Message is required');
  if (
    !notification.priority ||
    !['low', 'medium', 'high', 'urgent'].includes(notification.priority)
  ) {
    errors.push('Invalid priority');
  }
  return { isValid: errors.length === 0, errors };
};
