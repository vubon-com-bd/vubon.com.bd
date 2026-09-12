import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { PODCAST_STATUS } from '@vubon/shared-constants/src/content/podcast-status.constants';

const podcastStatusKeys = Object.keys(PODCAST_STATUS) as [string, ...string[]];

export const PodcastStatusSchema = StatusSchema.extend({
  status: z.enum(podcastStatusKeys),
  category: z.literal('podcast'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const PodcastStatusEnumSchema = z.enum(podcastStatusKeys);
