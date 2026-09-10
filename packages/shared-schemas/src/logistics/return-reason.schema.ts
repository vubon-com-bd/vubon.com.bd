import { z } from 'zod';
import { RETURN_REASON } from '@vubon/shared-constants/src/logistics/return-reason.constants';

const returnReasonTypeKeys = Object.keys(RETURN_REASON.TYPES) as [string, ...string[]];
const returnReasonCategoryKeys = Object.keys(RETURN_REASON.REASON_CATEGORIES) as [
  string,
  ...string[],
];
const returnReasonPriorityKeys = Object.keys(RETURN_REASON.REASON_PRIORITY) as [
  string,
  ...string[],
];

export const ReturnReasonSchema = z.object({
  type: z.enum(returnReasonTypeKeys),
  category: z.enum(returnReasonCategoryKeys),
  priority: z.enum(returnReasonPriorityKeys),
  isDefective: z.boolean().default(false),
  isDamaged: z.boolean().default(false),
  isWrongItem: z.boolean().default(false),
  isMissingParts: z.boolean().default(false),
  isNotAsDescribed: z.boolean().default(false),
  isSizeIssue: z.boolean().default(false),
  isColorIssue: z.boolean().default(false),
  isQualityIssue: z.boolean().default(false),
  isDeliveryIssue: z.boolean().default(false),
  isCustomerRequest: z.boolean().default(false),
  isOther: z.boolean().default(false),
});

export const ReturnReasonEnumSchema = z.enum(returnReasonTypeKeys);
