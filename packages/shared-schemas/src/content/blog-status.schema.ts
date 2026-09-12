import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { BLOG_STATUS } from '@vubon/shared-constants/src/content/blog-status.constants';

const blogStatusKeys = Object.keys(BLOG_STATUS) as [string, ...string[]];

export const BlogStatusSchema = StatusSchema.extend({
  status: z.enum(blogStatusKeys),
  category: z.literal('blog'),
  isDraft: z.boolean().default(false),
  isPendingReview: z.boolean().default(false),
  isInReview: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isRejected: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isUnpublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const BlogStatusEnumSchema = z.enum(blogStatusKeys);
