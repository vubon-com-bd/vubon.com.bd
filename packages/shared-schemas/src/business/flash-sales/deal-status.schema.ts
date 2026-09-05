/**
 * Deal Status Schema
 * ডিল স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DEAL_STATUS } from '@vubon/shared-constants';

export const DealStatusSchema = BaseSchema.extend({
  dealId: z.string().uuid(),
  status: z.enum(Object.values(DEAL_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(DEAL_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const DealStatusUpdateSchema = DealStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type DealStatus = z.infer<typeof DealStatusSchema>;
export type DealStatusUpdate = z.infer<typeof DealStatusUpdateSchema>;
