import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { CONTENT_STATUS } from '@vubon/shared-constants/src/content/content-status.constants';

const contentStatusKeys = Object.keys(CONTENT_STATUS) as [string, ...string[]];

export const ContentStatusSchema = StatusSchema.extend({
  status: z.enum(contentStatusKeys),
  category: z.literal('content'),
  isDraft: z.boolean().default(false),
  isPendingReview: z.boolean().default(false),
  isInReview: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isRejected: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isUnpublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const ContentStatusEnumSchema = z.enum(contentStatusKeys);
