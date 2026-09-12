import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { IN_APP } from '@vubon/shared-constants/src/platform/notification/in-app.constants';

const inAppStatusKeys = Object.keys(IN_APP.STATUS) as [string, ...string[]];
const inAppTypeKeys = Object.keys(IN_APP.TYPES) as [string, ...string[]];

export const InAppSchema = BaseSchema.extend({
  inAppId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(inAppStatusKeys),
  type: z.enum(inAppTypeKeys),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  icon: z.string().url().optional(),
  image: z.string().url().optional(),
  action: z.string().optional(),
  actionUrl: z.string().url().optional(),
  displayedAt: z.date().optional(),
  interactedAt: z.date().optional(),
  dismissedAt: z.date().optional(),
  expiredAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
