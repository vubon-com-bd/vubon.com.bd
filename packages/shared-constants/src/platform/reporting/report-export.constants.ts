import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_FORMAT } from './report-format.constants';

export const REPORT_EXPORT = {
  TYPES: {
    ...COMMON_TYPES,
    DOWNLOAD: 'download',
    EMAIL: 'email',
    FTP: 'ftp',
    S3: 's3',
    DRIVE: 'drive',
    API: 'api',
  },
  REPORT_FORMAT: { ...REPORT_FORMAT },
  EXPORT_DESTINATIONS: {
    LOCAL: 'local',
    EMAIL: 'email',
    FTP: 'ftp',
    S3: 's3',
    GOOGLE_DRIVE: 'google_drive',
    DROPBOX: 'dropbox',
  },
  MAX_EXPORT_SIZE_MB: 100,
  EXPORT_TIMEOUT_MINUTES: 30,
  MAX_EXPORT_ROWS: 100000,
} as const;
