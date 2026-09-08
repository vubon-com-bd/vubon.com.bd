import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const DRIVER = {
  STATUS: {
    ...COMMON_STATUS,
    AVAILABLE: 'available',
    BUSY: 'busy',
    OFF_DUTY: 'off_duty',
    ON_LEAVE: 'on_leave',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
  },
  TYPES: {
    ...COMMON_TYPES,
    FULL_TIME: 'full_time',
    PART_TIME: 'part_time',
    CONTRACTUAL: 'contractual',
    FREELANCE: 'freelance',
  },
  USER_STATUS: { ...USER_STATUS },
  LICENSE_TYPES: {
    LIGHT: 'light',
    HEAVY: 'heavy',
    MOTORCYCLE: 'motorcycle',
    COMMERCIAL: 'commercial',
  },
  MAX_SHIFT_HOURS: 12,
  BREAK_INTERVAL_HOURS: 6,
  MAX_DELIVERIES_PER_SHIFT: 30,
} as const;
