import { AdminLog } from '@vubon/shared-types';

export const validateAdminLog = (
  log: Partial<AdminLog>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!log.level || !['info', 'warning', 'error', 'critical'].includes(log.level)) {
    errors.push('Invalid log level');
  }
  return { isValid: errors.length === 0, errors };
};
