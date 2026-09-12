import { DOCUMENT } from '@vubon/shared-constants/src/common/document.constants';

export const exportConfig = {
  maxFileSize: 100 * 1024 * 1024,
  maxRows: 100_000,
  timeout: 30 * 60,
  formats: [
    DOCUMENT.FORMATS.PDF,
    DOCUMENT.FORMATS.XLSX,
    DOCUMENT.FORMATS.CSV,
    DOCUMENT.FORMATS.JSON,
  ],
  defaultFormat: DOCUMENT.FORMATS.PDF,
  destinations: ['local', 'email', 'ftp', 's3', 'google_drive', 'dropbox'],
} as const;
