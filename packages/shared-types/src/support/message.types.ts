import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { MESSAGE } from '@vubon/shared-constants/src/support/message.constants';
import { Conversation } from './conversation.types';
import { Attachment } from './attachment.types';

/**
 * Message type/status value types.
 * Note: Use `(typeof X)[keyof typeof X]` for VALUES, not `keyof typeof X`.
 */
export type MessageTypeValue = (typeof MESSAGE.TYPES)[keyof typeof MESSAGE.TYPES];
export type MessageStatusValue = (typeof MESSAGE.STATUS)[keyof typeof MESSAGE.STATUS];

export interface Message extends BaseEntity {
  messageId: string;
  conversationId: string;
  conversation: Conversation;
  senderId: string;
  sender: User;
  type: MessageTypeValue;
  status: MessageStatusValue;
  content: string;
  attachments: Attachment[];
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  metadata: Record<string, unknown>;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
}
