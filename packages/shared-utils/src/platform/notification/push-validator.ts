import { PUSH } from '@vubon/shared-constants/src/platform/notification/push.constants';

export interface PushInput {
  notificationId: string;
  title: string;
  body: string;
  status: string;
}

export const validatePush = (push: Partial<PushInput>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!push.notificationId) errors.push('Notification ID is required');
  if (!push.title) errors.push('Push title is required');
  if (!push.body) errors.push('Push body is required');
  if (push.title && push.title.length > 50) {
    errors.push('Title must not exceed 50 characters');
  }
  if (push.body && push.body.length > 200) {
    errors.push('Body must not exceed 200 characters');
  }
  if (push.status && !Object.keys(PUSH.STATUS).includes(push.status)) {
    errors.push('Invalid push status');
  }
  return { isValid: errors.length === 0, errors };
};
