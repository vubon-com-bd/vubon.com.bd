import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { VIDEO_STATUS } from '@vubon/shared-constants/src/content/video-status.constants';

const videoStatusKeys = Object.keys(VIDEO_STATUS) as [string, ...string[]];

export const VideoStatusSchema = StatusSchema.extend({
  status: z.enum(videoStatusKeys),
  category: z.literal('video'),
  isUploading: z.boolean().default(false),
  isProcessing: z.boolean().default(false),
  isReady: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isUnpublished: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export const VideoStatusEnumSchema = z.enum(videoStatusKeys);
