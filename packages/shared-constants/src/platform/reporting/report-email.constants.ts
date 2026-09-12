import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_FORMAT } from './report-format.constants';

export const REPORT_EMAIL = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    SENDING: 'sending',
    SENT: 'sent',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
  },
  TYPES: {
    ...COMMON_TYPES,
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    SCHEDULED: 'scheduled',
    AD_HOC: 'ad_hoc',
  },
  REPORT_FORMAT: { ...REPORT_FORMAT },
  EMAIL_TEMPLATES: {
    SUMMARY: 'email_summary_template',
    DETAILED: 'email_detailed_template',
    SCHEDULED: 'email_scheduled_template',
  },
  MAX_RECIPIENTS: 50,
  MAX_EMAIL_SIZE_MB: 10,
  EMAIL_TIMEOUT_SECONDS: 30,
} as const;
