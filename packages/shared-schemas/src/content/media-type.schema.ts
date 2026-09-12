import { z } from 'zod';
import { MEDIA_TYPE } from '@vubon/shared-constants/src/content/media-type.constants';

const mediaTypeKeys = Object.keys(MEDIA_TYPE.TYPES) as [string, ...string[]];

export const MediaTypeSchema = z.object({
  type: z.enum(mediaTypeKeys),
  category: z.literal('media_type'),
  isImage: z.boolean().default(false),
  isVideo: z.boolean().default(false),
  isAudio: z.boolean().default(false),
  isDocument: z.boolean().default(false),
  isOther: z.boolean().default(false),
});

export const MediaTypeEnumSchema = z.enum(mediaTypeKeys);
