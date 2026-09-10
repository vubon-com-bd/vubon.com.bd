import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { PAGE_STATUS } from '@vubon/shared-constants/src/content/page-status.constants';

const pageStatusKeys = Object.keys(PAGE_STATUS) as [string, ...string[]];

export const PageStatusSchema = StatusSchema.extend({
  status: z.enum(pageStatusKeys),
  category: z.literal('page'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isUnpublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export const PageStatusEnumSchema = z.enum(pageStatusKeys);
