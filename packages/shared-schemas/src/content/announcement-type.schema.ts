import { z } from 'zod';
import { ANNOUNCEMENT_TYPE } from '@vubon/shared-constants/src/content/announcement-type.constants';

const announcementTypeKeys = Object.keys(ANNOUNCEMENT_TYPE.TYPES) as [string, ...string[]];

export const AnnouncementTypeSchema = z.object({
  type: z.enum(announcementTypeKeys),
  category: z.literal('announcement'),
  isGeneral: z.boolean().default(false),
  isPromotional: z.boolean().default(false),
  isMaintenance: z.boolean().default(false),
  isSecurity: z.boolean().default(false),
  isFeature: z.boolean().default(false),
  isUpdate: z.boolean().default(false),
  isEvent: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
});

export const AnnouncementTypeEnumSchema = z.enum(announcementTypeKeys);
