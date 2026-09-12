import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { MediaSchema } from './media.schema';
import { WEBINAR_STATUS } from '@vubon/shared-constants/src/content/webinar-status.constants';
import { WEBINAR } from '@vubon/shared-constants/src/content/webinar.constants';

const webinarStatusKeys = Object.keys(WEBINAR_STATUS) as [string, ...string[]];
const webinarTypeKeys = Object.keys(WEBINAR.WEBINAR_TYPES) as [string, ...string[]];

export const WebinarSchema = BaseSchema.extend({
  webinarId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  status: z.enum(webinarStatusKeys),
  type: z.enum(webinarTypeKeys),
  hostId: z.string().uuid(),
  host: UserSchema,
  featuredImage: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  recordingUrl: z.string().url().optional(),
  duration: z.number().min(0),
  maxAttendees: z.number().int().min(0),
  registeredAttendees: z.number().int().min(0).default(0),
  actualAttendees: z.number().int().min(0).default(0),
  media: MediaSchema.optional(),
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isLive: z.boolean().default(false),
  startsAt: z.date(),
  endsAt: z.date(),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      tags: z.array(z.string()),
      speakers: z.array(
        z.object({
          name: z.string(),
          title: z.string(),
          avatar: z.string().url().optional(),
          bio: z.string().optional(),
        })
      ),
      agenda: z.array(
        z.object({
          time: z.string(),
          title: z.string(),
          description: z.string().optional(),
          speaker: z.string().optional(),
        })
      ),
    })
    .optional(),
});
