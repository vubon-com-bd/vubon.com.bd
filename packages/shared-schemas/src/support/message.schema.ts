import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AttachmentSchema } from './attachment.schema';
import { MESSAGE } from '@vubon/shared-constants/src/support/message.constants';

const messageTypeKeys = Object.keys(MESSAGE.TYPES) as [string, ...string[]];
const messageStatusKeys = Object.keys(MESSAGE.STATUS) as [string, ...string[]];

export const MessageSchema = BaseSchema.extend({
  messageId: z.string().uuid(),
  conversationId: z.string().uuid(),
  senderId: z.string().uuid(),
  sender: UserSchema,
  type: z.enum(messageTypeKeys),
  status: z.enum(messageStatusKeys),
  content: z.string().min(1).max(10000),
  attachments: z.array(AttachmentSchema),
  isEdited: z.boolean().default(false),
  editedAt: z.date().optional(),
  isDeleted: z.boolean().default(false),
  deletedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
  sentAt: z.date(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
});
