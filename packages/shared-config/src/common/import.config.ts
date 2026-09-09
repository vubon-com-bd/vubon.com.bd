export const importConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50 MB
  maxRows: 50000,
  timeout: 30 * 60, // 30 minutes
  formats: ['csv', 'excel', 'json'],
  defaultFormat: 'csv',
  batchSize: 1000,
};
