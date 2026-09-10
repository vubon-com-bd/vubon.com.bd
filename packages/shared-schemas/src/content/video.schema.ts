import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { MediaSchema } from './media.schema';
import { VIDEO_STATUS } from '@vubon/shared-constants/src/content/video-status.constants';
import { CONTENT_VIDEO } from '@vubon/shared-constants/src/content/content-video.constants';

const videoStatusKeys = Object.keys(VIDEO_STATUS) as [string, ...string[]];
const videoTypeKeys = Object.keys(CONTENT_VIDEO.VIDEO_TYPES) as [string, ...string[]];

export const VideoSchema = BaseSchema.extend({
  videoId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  url: z.string().url(),
  thumbnail: z.string().url().optional(),
  status: z.enum(videoStatusKeys),
  type: z.enum(videoTypeKeys),
  duration: z.number().min(0),
  width: z.number().int().min(0),
  height: z.number().int().min(0),
  size: z.number().min(0),
  format: z.string(),
  uploadedBy: z.string().uuid(),
  uploadedByUser: UserSchema,
  media: MediaSchema.optional(),
  viewCount: z.number().int().min(0).default(0),
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
      captions: z.string().optional(),
      transcript: z.string().optional(),
      tags: z.array(z.string()),
    })
    .optional(),
});
