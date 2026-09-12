import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { ANNOUNCEMENT_STATUS } from '@vubon/shared-constants/src/content/announcement-status.constants';

const announcementStatusKeys = Object.keys(ANNOUNCEMENT_STATUS) as [string, ...string[]];

export const AnnouncementStatusSchema = StatusSchema.extend({
  status: z.enum(announcementStatusKeys),
  category: z.literal('announcement'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const AnnouncementStatusEnumSchema = z.enum(announcementStatusKeys);
