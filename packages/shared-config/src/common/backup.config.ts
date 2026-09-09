export const backupConfig = {
  enabled: true,
  frequency: 'daily',
  retentionDays: 30,
  maxBackups: 30,
  storage: 'local',
  compress: true,
  excludeTables: ['logs', 'sessions'],
};
