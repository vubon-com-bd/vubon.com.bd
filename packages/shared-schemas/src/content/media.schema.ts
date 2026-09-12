import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { MediaTypeSchema } from './media-type.schema';
import { MediaFormatSchema } from './media-format.schema';
import { MEDIA_STATUS } from '@vubon/shared-constants/src/content/media-status.constants';

const mediaStatusKeys = Object.keys(MEDIA_STATUS) as [string, ...string[]];

export const MediaSchema = BaseSchema.extend({
  mediaId: z.string().uuid(),
  name: z.string().min(1).max(255),
  filename: z.string().min(1).max(255),
  url: z.string().url(),
  type: MediaTypeSchema,
  format: MediaFormatSchema,
  size: z.number().min(0),
  width: z.number().int().min(0).optional(),
  height: z.number().int().min(0).optional(),
  duration: z.number().min(0).optional(),
  status: z.enum(mediaStatusKeys),
  uploadedBy: z.string().uuid(),
  uploadedByUser: UserSchema,
  altText: z.string().optional(),
  caption: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()),
  isPublic: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  uploadedAt: z.date(),
  metadata: z
    .object({
      exif: z.record(z.unknown()).optional(),
      iptc: z.record(z.unknown()).optional(),
      xmp: z.record(z.unknown()).optional(),
      hash: z.string().optional(),
      dominantColor: z.string().optional(),
      compression: z.string().optional(),
    })
    .optional(),
});
