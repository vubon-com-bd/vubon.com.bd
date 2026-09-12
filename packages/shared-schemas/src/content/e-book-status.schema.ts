import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { E_BOOK_STATUS } from '@vubon/shared-constants/src/content/e-book-status.constants';

const eBookStatusKeys = Object.keys(E_BOOK_STATUS) as [string, ...string[]];

export const EBookStatusSchema = StatusSchema.extend({
  status: z.enum(eBookStatusKeys),
  category: z.literal('ebook'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const EBookStatusEnumSchema = z.enum(eBookStatusKeys);
