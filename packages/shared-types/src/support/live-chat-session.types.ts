import { BaseEntity } from '../common/base.types';
import { LIVE_CHAT } from '@vubon/shared-constants/src/support/live-chat.constants';

export interface LiveChatSession extends BaseEntity {
  sessionId: string;
  chatId: string;
  status: keyof typeof LIVE_CHAT.STATUS | string;
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  sessionToken: string;
  expiresAt: Date;
  lastActivity: Date;
  isActive: boolean;
  isExpired: boolean;
  metadata: Record<string, unknown>;
}
