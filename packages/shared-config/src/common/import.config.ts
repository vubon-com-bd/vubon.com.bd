export const importConfig = {
  maxFileSize: 50 * 1024 * 1024,
  maxRows: 50_000,
  timeout: 30 * 60,
  formats: ['csv', 'excel', 'json'],
  defaultFormat: 'csv' as const,
  batchSize: 1000,
} as const;
