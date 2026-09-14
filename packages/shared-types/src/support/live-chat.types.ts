/**
 * Live Chat Types
 * @module shared-types/support
 */

import type {
  LIVE_CHAT_STATUS,
  LIVE_CHAT_SESSION_STATUS,
  LIVE_CHAT_TRIGGER,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type LiveChatStatusValue = (typeof LIVE_CHAT_STATUS)[keyof typeof LIVE_CHAT_STATUS];

export type LiveChatSessionStatusValue =
  (typeof LIVE_CHAT_SESSION_STATUS)[keyof typeof LIVE_CHAT_SESSION_STATUS];

export type LiveChatTriggerValue = (typeof LIVE_CHAT_TRIGGER)[keyof typeof LIVE_CHAT_TRIGGER];

export interface LiveChatSession extends BaseEntity<string> {
  readonly userId?: UserId;
  readonly agentId?: UserId;
  readonly visitorId?: string;
  readonly status: LiveChatSessionStatusValue;
  readonly trigger: LiveChatTriggerValue;
  readonly subject?: string;
  readonly messageCount: number;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly durationSeconds?: number;
  readonly transferredTo?: UserId;
  readonly rating?: number;
  readonly ratingComment?: string;
  readonly transcriptUrl?: string;
}

export interface LiveChatAgent {
  readonly userId: UserId;
  readonly status: LiveChatStatusValue;
  readonly activeChatCount: number;
  readonly maxConcurrentChats: number;
  readonly lastActiveAt: string;
}

export interface LiveChatPublic {
  readonly id: string;
  readonly status: LiveChatSessionStatusValue;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly durationSeconds?: number;
}
