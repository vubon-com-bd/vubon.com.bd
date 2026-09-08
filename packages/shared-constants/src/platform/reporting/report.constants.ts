import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { REPORT_TYPE } from './report-type.constants';
import { REPORT_STATUS } from './report-status.constants';
import { REPORT_FORMAT } from './report-format.constants';
import { REPORT_PRIORITY } from './report-priority.constants';
import { REPORT_TEMPLATE } from './report-template.constants';

export const REPORT = {
  STATUS: {
    ...STATUS,
    ...REPORT_STATUS,
    DRAFT: 'draft',
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'report:view',
    CREATE: 'report:create',
    UPDATE: 'report:update',
    DELETE: 'report:delete',
    GENERATE: 'report:generate',
    EXPORT: 'report:export',
    SHARE: 'report:share',
  },
  REPORT_TYPE: { ...REPORT_TYPE },
  REPORT_STATUS: { ...REPORT_STATUS },
  REPORT_FORMAT: { ...REPORT_FORMAT },
  REPORT_PRIORITY: { ...REPORT_PRIORITY },
  REPORT_TEMPLATE: { ...REPORT_TEMPLATE },
  REPORT_NAME_MAX_LENGTH: 100,
  REPORT_DESCRIPTION_MAX_LENGTH: 500,
  MAX_REPORT_SIZE_MB: 100,
  MAX_ROWS_PER_REPORT: 100000,
} as const;
