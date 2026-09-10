import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { MEDIA_STATUS } from '@vubon/shared-constants/src/content/media-status.constants';

const mediaStatusKeys = Object.keys(MEDIA_STATUS) as [string, ...string[]];

export const MediaStatusSchema = StatusSchema.extend({
  status: z.enum(mediaStatusKeys),
  category: z.literal('media'),
  isUploading: z.boolean().default(false),
  isProcessing: z.boolean().default(false),
  isUploaded: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const MediaStatusEnumSchema = z.enum(mediaStatusKeys);
