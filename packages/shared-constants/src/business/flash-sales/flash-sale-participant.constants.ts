import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { USER_TYPES } from '../../user/user-type.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_PARTICIPANT = {
  STATUS: {
    ...COMMON_STATUS,
    REGISTERED: 'registered',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected',
    WAITLISTED: 'waitlisted',
  },
  USER_STATUS: { ...USER_STATUS },
  USER_TYPES: { ...USER_TYPES },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  PARTICIPATION_TYPES: {
    BUYER: 'buyer',
    SELLER: 'seller',
    BOTH: 'both',
  },
  MAX_PARTICIPANTS: 10000,
  MIN_PARTICIPANTS: 1,
  PARTICIPATION_FEE: 0,
} as const;
