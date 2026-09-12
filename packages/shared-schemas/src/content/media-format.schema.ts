import { z } from 'zod';
import { MEDIA_FORMAT } from '@vubon/shared-constants/src/content/media-format.constants';

const mediaFormatTypeKeys = Object.keys(MEDIA_FORMAT.TYPES) as [string, ...string[]];

export const MediaFormatSchema = z.object({
  format: z.enum(mediaFormatTypeKeys),
  category: z.literal('media_format'),
  extension: z.string(),
  mimeType: z.string(),
});

export const MediaFormatEnumSchema = z.enum(mediaFormatTypeKeys);
