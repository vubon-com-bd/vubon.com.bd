import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { TICKET_STATUS } from './ticket-status.constants';
import { TICKET_PRIORITY } from './ticket-priority.constants';
import { TICKET_TYPE } from './ticket-type.constants';
import { TICKET_CATEGORY } from './ticket-category.constants';
import { ORDER_STATUS } from '../business/checkout/order-status.constants';
import { PAYMENT_STATUS } from '../business/payment/payment-status.constants';

export const TICKET = {
  STATUS: {
    ...STATUS,
    ...TICKET_STATUS,
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    ON_HOLD: 'on_hold',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REOPENED: 'reopened',
    ESCALATED: 'escalated',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'ticket:view',
    CREATE: 'ticket:create',
    UPDATE: 'ticket:update',
    DELETE: 'ticket:delete',
    ASSIGN: 'ticket:assign',
    ESCALATE: 'ticket:escalate',
    RESOLVE: 'ticket:resolve',
    CLOSE: 'ticket:close',
  },
  TICKET_STATUS: { ...TICKET_STATUS },
  TICKET_PRIORITY: { ...TICKET_PRIORITY },
  TICKET_TYPE: { ...TICKET_TYPE },
  TICKET_CATEGORY: { ...TICKET_CATEGORY },
  ORDER_STATUS: { ...ORDER_STATUS },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  TICKET_NUMBER_PREFIX: 'TKT',
  TICKET_NUMBER_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_DESCRIPTION_LENGTH: 10,
  AUTO_CLOSE_DAYS: 7,
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 10,
} as const;
