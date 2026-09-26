/**
 * Support Message Types
 * @module shared-types/support
 *
 * Values আসে shared-constants/support/message.constants থেকে।
 *
 * ⚠️ Note: MESSAGE entity না, SupportMessage।
 */

import type {
  MESSAGE_TYPE,
  MESSAGE_STATUS,
  MESSAGE_SENDER_TYPE,
} from '@vubon/shared-constants/support';
import type { UserId, Url } from '../common/primitives';
import type { BaseEntity } from '../common/base';

export type SupportMessageTypeValue = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

export type SupportMessageStatusValue = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];

export type SupportMessageSenderTypeValue =
  (typeof MESSAGE_SENDER_TYPE)[keyof typeof MESSAGE_SENDER_TYPE];

export interface SupportMessage extends BaseEntity<string> {
  readonly conversationId: string;
  readonly ticketId?: string;
  readonly senderId?: UserId;
  readonly senderType: SupportMessageSenderTypeValue;
  readonly senderName?: string;
  readonly type: SupportMessageTypeValue;
  readonly status: SupportMessageStatusValue;
  readonly content?: string;
  readonly attachments?: readonly string[];
  readonly imageUrl?: Url;
  readonly isInternal: boolean;
  readonly readBy?: readonly UserId[];
  readonly readAt?: string;
  readonly editedAt?: string;
  readonly deletedAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SupportMessagePublic {
  readonly id: string;
  readonly conversationId: string;
  readonly senderId?: UserId;
  readonly senderType: SupportMessageSenderTypeValue;
  readonly type: SupportMessageTypeValue;
  readonly content?: string;
  readonly attachments?: readonly string[];
  readonly isInternal: boolean;
  readonly createdAt: string;
}

export interface SupportMessageInput {
  readonly conversationId: string;
  readonly content: string;
  readonly type?: SupportMessageTypeValue;
  readonly attachments?: readonly string[];
  readonly isInternal?: boolean;
}
