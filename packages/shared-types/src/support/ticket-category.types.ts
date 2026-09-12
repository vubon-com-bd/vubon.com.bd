import { TypeObject } from '../common/types.types';
import { TICKET_CATEGORY } from '@vubon/shared-constants/src/support/ticket-category.constants';

export interface TicketCategory extends TypeObject {
  type: keyof typeof TICKET_CATEGORY.TYPES | string;
  category: 'ticket_category';
  agentGroup: keyof typeof TICKET_CATEGORY.CATEGORY_AGENTS | string;
  isAccountIssues: boolean;
  isOrderIssues: boolean;
  isPaymentIssues: boolean;
  isDeliveryIssues: boolean;
  isProductIssues: boolean;
  isVendorIssues: boolean;
  isTechnicalIssues: boolean;
  isBillingIssues: boolean;
  isReturnIssues: boolean;
  isRefundIssues: boolean;
  isFeatureRequest: boolean;
  isComplaint: boolean;
  isFeedback: boolean;
  isGeneral: boolean;
  isOther: boolean;
}

export type TicketCategoryKey = keyof typeof TICKET_CATEGORY.TYPES;
