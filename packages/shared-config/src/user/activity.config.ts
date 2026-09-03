/**
 * Activity Configuration
 * ইউজার অ্যাক্টিভিটি কনফিগারেশন
 */

import { USER_ACTIVITY } from '@vubon/shared-constants';

export interface ActivityConfig {
  enabled: boolean;
  types: string[];
  statuses: string[];
  importanceLevels: string[];
  defaults: {
    maxRecords: number;
    retentionDays: number;
    batchSize: number;
  };
  tracking: {
    logIP: boolean;
    logUserAgent: boolean;
    logLocation: boolean;
  };
  cleanup: {
    enabled: boolean;
    intervalDays: number;
  };
}

export const createActivityConfig = (): ActivityConfig => ({
  enabled: true,
  types: Object.values(USER_ACTIVITY.TYPES),
  statuses: Object.values(USER_ACTIVITY.STATUS),
  importanceLevels: Object.values(USER_ACTIVITY.IMPORTANCE),
  defaults: {
    maxRecords: USER_ACTIVITY.DEFAULTS.MAX_RECORDS,
    retentionDays: USER_ACTIVITY.DEFAULTS.RETENTION_DAYS,
    batchSize: USER_ACTIVITY.DEFAULTS.BATCH_SIZE,
  },
  tracking: {
    logIP: true,
    logUserAgent: true,
    logLocation: false,
  },
  cleanup: {
    enabled: true,
    intervalDays: 7,
  },
});
