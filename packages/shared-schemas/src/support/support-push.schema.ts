import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { PUSH } from '@vubon/shared-constants/src/platform/notification/push.constants';

const pushStatusKeys = Object.keys(PUSH.STATUS) as [string, ...string[]];
const pushTypeKeys = Object.keys(PUSH.TYPES) as [string, ...string[]];

export const SupportPushSchema = BaseSchema.extend({
  pushId: z.string().uuid(),
  ticketId: z.string().uuid().optional(),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(200),
  status: z.enum(pushStatusKeys),
  type: z.enum(pushTypeKeys),
  sentBy: z.string().uuid(),
  sentAt: z.date(),
  deliveredAt: z.date().optional(),
  openedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
