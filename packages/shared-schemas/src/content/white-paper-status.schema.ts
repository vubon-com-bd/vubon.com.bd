import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { WHITE_PAPER_STATUS } from '@vubon/shared-constants/src/content/white-paper-status.constants';

const whitePaperStatusKeys = Object.keys(WHITE_PAPER_STATUS) as [string, ...string[]];

export const WhitePaperStatusSchema = StatusSchema.extend({
  status: z.enum(whitePaperStatusKeys),
  category: z.literal('white_paper'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const WhitePaperStatusEnumSchema = z.enum(whitePaperStatusKeys);
