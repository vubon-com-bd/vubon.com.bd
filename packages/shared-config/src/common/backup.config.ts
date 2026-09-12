export const backupConfig = {
  enabled: true,
  frequency: 'daily' as const,
  retentionDays: 30,
  maxBackups: 30,
  storage: 'local' as const,
  compress: true,
  excludeTables: ['logs', 'sessions'],
} as const;
