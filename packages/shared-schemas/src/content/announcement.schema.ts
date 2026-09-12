import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AnnouncementTypeSchema } from './announcement-type.schema';
import { ANNOUNCEMENT_STATUS } from '@vubon/shared-constants/src/content/announcement-status.constants';
import { ANNOUNCEMENT } from '@vubon/shared-constants/src/content/announcement.constants';

const announcementStatusKeys = Object.keys(ANNOUNCEMENT_STATUS) as [string, ...string[]];
const announcementPriorityKeys = Object.keys(ANNOUNCEMENT.PRIORITY) as [string, ...string[]];

export const AnnouncementSchema = BaseSchema.extend({
  announcementId: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(1000),
  status: z.enum(announcementStatusKeys),
  type: AnnouncementTypeSchema,
  priority: z.enum(announcementPriorityKeys),
  createdBy: z.string().uuid(),
  createdByUser: UserSchema,
  image: z.string().url().optional(),
  link: z.string().url().optional(),
  linkText: z.string().optional(),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  isDismissible: z.boolean().default(true),
  startsAt: z.date(),
  endsAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
