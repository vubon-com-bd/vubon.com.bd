import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LIVE_CHAT } from '@vubon/shared-constants/src/support/live-chat.constants';

const liveChatSessionStatusKeys = Object.keys(LIVE_CHAT.STATUS) as [string, ...string[]];

export const LiveChatSessionSchema = BaseSchema.extend({
  sessionId: z.string().uuid(),
  chatId: z.string().uuid(),
  status: z.enum(liveChatSessionStatusKeys),
  ipAddress: z.string(),
  userAgent: z.string(),
  deviceId: z.string(),
  sessionToken: z.string(),
  expiresAt: z.date(),
  lastActivity: z.date(),
  isActive: z.boolean().default(true),
  isExpired: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
