export interface AdminLog {
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  data: Record<string, unknown>;
}

export const validateAdminLog = (
  log: Partial<AdminLog>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!log.level || !['info', 'warning', 'error', 'critical'].includes(log.level)) {
    errors.push('Invalid log level');
  }
  if (!log.message) errors.push('Log message is required');
  return { isValid: errors.length === 0, errors };
};
