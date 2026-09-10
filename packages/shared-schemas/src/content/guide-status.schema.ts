import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { GUIDE_STATUS } from '@vubon/shared-constants/src/content/guide-status.constants';

const guideStatusKeys = Object.keys(GUIDE_STATUS) as [string, ...string[]];

export const GuideStatusSchema = StatusSchema.extend({
  status: z.enum(guideStatusKeys),
  category: z.literal('guide'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isUpdated: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const GuideStatusEnumSchema = z.enum(guideStatusKeys);
