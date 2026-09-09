export const exportConfig = {
  maxFileSize: 100 * 1024 * 1024, // 100 MB
  maxRows: 100000,
  timeout: 30 * 60, // 30 minutes
  formats: ['pdf', 'excel', 'csv', 'json'],
  defaultFormat: 'pdf',
  destinations: ['local', 'email', 'ftp', 's3', 'google_drive', 'dropbox'],
};
