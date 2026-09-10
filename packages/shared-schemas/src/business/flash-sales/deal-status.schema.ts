import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { DEAL_STATUS } from '@vubon/shared-constants/src/business/flash-sales/deal-status.constants';

const dealStatusKeys = Object.keys(DEAL_STATUS) as [string, ...string[]];

export const DealStatusSchema = StatusSchema.extend({
  status: z.enum(dealStatusKeys),
  category: z.literal('deal'),
  isDraft: z.boolean().default(false),
  isActive: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
});

export const DealStatusEnumSchema = z.enum(dealStatusKeys);
