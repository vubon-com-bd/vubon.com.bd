import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { GALLERY_STATUS } from '@vubon/shared-constants/src/content/gallery-status.constants';

const galleryStatusKeys = Object.keys(GALLERY_STATUS) as [string, ...string[]];

export const GalleryStatusSchema = StatusSchema.extend({
  status: z.enum(galleryStatusKeys),
  category: z.literal('gallery'),
  isActive: z.boolean().default(false),
  isInactive: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const GalleryStatusEnumSchema = z.enum(galleryStatusKeys);
