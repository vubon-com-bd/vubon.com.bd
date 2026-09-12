import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PUSH } from '@vubon/shared-constants/src/platform/notification/push.constants';

const pushStatusKeys = Object.keys(PUSH.STATUS) as [string, ...string[]];
const pushTypeKeys = Object.keys(PUSH.TYPES) as [string, ...string[]];
const pushProviderKeys = Object.keys(PUSH.PUSH_PROVIDERS) as [string, ...string[]];

export const PushSchema = BaseSchema.extend({
  pushId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(pushStatusKeys),
  type: z.enum(pushTypeKeys),
  provider: z.enum(pushProviderKeys),
  title: z.string().min(1).max(50),
  body: z.string().min(1).max(200),
  icon: z.string().url().optional(),
  image: z.string().url().optional(),
  badge: z.number().int().min(0).optional(),
  sound: z.string().optional(),
  data: z.record(z.unknown()),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  openedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
