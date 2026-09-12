import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { TIME_FORMAT } from '../../common/time-format.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_SCHEDULE = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    RESCHEDULED: 'rescheduled',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  TIME_FORMAT: { ...TIME_FORMAT },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  SCHEDULE_TYPES: {
    ONCE: 'once',
    RECURRING: 'recurring',
    CUSTOM: 'custom',
  },
  DEFAULT_DURATION_HOURS: 24,
  MAX_DURATION_HOURS: 72,
  MIN_DURATION_HOURS: 1,
  ADVANCE_NOTICE_HOURS: 48,
} as const;
