import { TypeObject } from '../common/types.types';
import { TICKET_TYPE } from '@vubon/shared-constants/src/support/ticket-type.constants';

export interface TicketType extends TypeObject {
  type: keyof typeof TICKET_TYPE.TYPES | string;
  category: 'ticket_type';
  isGeneral: boolean;
  isTechnical: boolean;
  isBilling: boolean;
  isOrder: boolean;
  isPayment: boolean;
  isShipping: boolean;
  isReturn: boolean;
  isRefund: boolean;
  isProduct: boolean;
  isVendor: boolean;
  isAccount: boolean;
  isSecurity: boolean;
  isFeature: boolean;
  isComplaint: boolean;
  isFeedback: boolean;
}

export type TicketTypeKey = keyof typeof TICKET_TYPE.TYPES;
