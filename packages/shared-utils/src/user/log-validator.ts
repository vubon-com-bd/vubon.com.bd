import { USER_LOG } from '@vubon/shared-constants';
import { UserLog } from '@vubon/shared-types';

export const validateLog = (log: Partial<UserLog>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!log.type || !Object.keys(USER_LOG).includes(log.type)) {
    errors.push('Invalid log type');
  }
  if (!log.message) errors.push('Log message is required');
  return { isValid: errors.length === 0, errors };
};
