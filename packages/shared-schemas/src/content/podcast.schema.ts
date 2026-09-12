import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { MediaSchema } from './media.schema';
import { PODCAST_STATUS } from '@vubon/shared-constants/src/content/podcast-status.constants';
import { PODCAST } from '@vubon/shared-constants/src/content/podcast.constants';

const podcastStatusKeys = Object.keys(PODCAST_STATUS) as [string, ...string[]];
const podcastTypeKeys = Object.keys(PODCAST.PODCAST_TYPES) as [string, ...string[]];

export const PodcastSchema = BaseSchema.extend({
  podcastId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  audioUrl: z.string().url(),
  coverImage: z.string().url().optional(),
  status: z.enum(podcastStatusKeys),
  type: z.enum(podcastTypeKeys),
  duration: z.number().min(0),
  size: z.number().min(0),
  format: z.string(),
  uploadedBy: z.string().uuid(),
  uploadedByUser: UserSchema,
  media: MediaSchema.optional(),
  playCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      transcript: z.string().optional(),
      tags: z.array(z.string()),
      season: z.number().int().min(1).optional(),
      episode: z.number().int().min(1).optional(),
    })
    .optional(),
});
