import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { MediaSchema } from './media.schema';
import { GALLERY_STATUS } from '@vubon/shared-constants/src/content/gallery-status.constants';
import { GALLERY } from '@vubon/shared-constants/src/content/gallery.constants';

const galleryStatusKeys = Object.keys(GALLERY_STATUS) as [string, ...string[]];
const galleryTypeKeys = Object.keys(GALLERY.GALLERY_TYPES) as [string, ...string[]];

export const GallerySchema = BaseSchema.extend({
  galleryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  status: z.enum(galleryStatusKeys),
  type: z.enum(galleryTypeKeys),
  media: z.array(MediaSchema),
  mediaCount: z.number().int().min(0).default(0),
  createdBy: z.string().uuid(),
  createdByUser: UserSchema,
  coverImage: z.string().url().optional(),
  isActive: z.boolean().default(true),
  isPublic: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
