import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { MESSAGE } from '@vubon/shared-constants/src/support/message.constants';
import { Conversation } from './conversation.types';
import { Attachment } from './attachment.types';

export interface Message extends BaseEntity {
  messageId: string;
  conversationId: string;
  conversation: Conversation;
  senderId: string;
  sender: User;
  type: keyof typeof MESSAGE.TYPES | string;
  status: keyof typeof MESSAGE.STATUS | string;
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
