/**
 * Conversation Types
 * @module shared-types/support
 *
 * Values আসে shared-constants/support/conversation.constants থেকে।
 */

import type { CONVERSATION_STATUS, CONVERSATION_TYPE } from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type ConversationStatusValue =
  (typeof CONVERSATION_STATUS)[keyof typeof CONVERSATION_STATUS];

export type ConversationTypeValue = (typeof CONVERSATION_TYPE)[keyof typeof CONVERSATION_TYPE];

export interface Conversation extends BaseEntity<string> {
  readonly title?: string;
  readonly type: ConversationTypeValue;
  readonly status: ConversationStatusValue;
  readonly ticketId?: string;
  readonly participantIds: readonly UserId[];
  readonly messageCount: number;
  readonly unreadCount: number;
  readonly lastMessageAt?: string;
  readonly lastMessagePreview?: string;
  readonly isLocked: boolean;
  readonly isPinned: boolean;
  readonly archivedAt?: string;
}

export interface ConversationPublic {
  readonly id: string;
  readonly title?: string;
  readonly type: ConversationTypeValue;
  readonly status: ConversationStatusValue;
  readonly participantIds: readonly UserId[];
  readonly messageCount: number;
  readonly lastMessageAt?: string;
}

export interface ConversationListFilter {
  readonly status?: ConversationStatusValue;
  readonly type?: ConversationTypeValue;
  readonly ticketId?: string;
  readonly participantId?: UserId;
  readonly fromDate?: string;
  readonly toDate?: string;
}
