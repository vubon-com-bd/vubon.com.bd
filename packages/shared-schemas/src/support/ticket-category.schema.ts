import { z } from 'zod';
import { TICKET_CATEGORY } from '@vubon/shared-constants/src/support/ticket-category.constants';

const ticketCategoryTypeKeys = Object.keys(TICKET_CATEGORY.TYPES) as [string, ...string[]];
const ticketCategoryAgentKeys = Object.keys(TICKET_CATEGORY.CATEGORY_AGENTS) as [
  string,
  ...string[],
];

export const TicketCategorySchema = z.object({
  category: z.enum(ticketCategoryTypeKeys),
  categoryType: z.literal('ticket_category'),
  agentGroup: z.enum(ticketCategoryAgentKeys),
  isAccountIssues: z.boolean().default(false),
  isOrderIssues: z.boolean().default(false),
  isPaymentIssues: z.boolean().default(false),
  isDeliveryIssues: z.boolean().default(false),
  isProductIssues: z.boolean().default(false),
  isVendorIssues: z.boolean().default(false),
  isTechnicalIssues: z.boolean().default(false),
  isBillingIssues: z.boolean().default(false),
  isReturnIssues: z.boolean().default(false),
  isRefundIssues: z.boolean().default(false),
  isFeatureRequest: z.boolean().default(false),
  isComplaint: z.boolean().default(false),
  isFeedback: z.boolean().default(false),
  isGeneral: z.boolean().default(false),
  isOther: z.boolean().default(false),
});

export const TicketCategoryEnumSchema = z.enum(ticketCategoryTypeKeys);
