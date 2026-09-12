import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { VEHICLE } from './vehicle.constants';
import { DRIVER } from './driver.constants';
import { ROUTE } from './route.constants';

export const DISPATCH = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    ASSIGNED: 'assigned',
    DEPARTED: 'departed',
    IN_TRANSIT: 'in_transit',
    ARRIVED: 'arrived',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
  },
  VEHICLE: { ...VEHICLE },
  DRIVER: { ...DRIVER },
  ROUTE: { ...ROUTE },
  DISPATCH_TYPES: {
    REGULAR: 'regular',
    URGENT: 'urgent',
    SCHEDULED: 'scheduled',
    ON_DEMAND: 'on_demand',
  },
  MAX_ITEMS_PER_DISPATCH: 200,
  DISPATCH_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    URGENT: 4,
  },
  DISPATCH_WINDOW_HOURS: 24,
} as const;
