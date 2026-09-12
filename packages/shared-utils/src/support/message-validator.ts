import { MESSAGE } from '@vubon/shared-constants/src/support/message.constants';

export interface MessageInput {
  conversationId: string;
  senderId: string;
  content: string;
  type: string;
  status: string;
}

export const validateMessage = (
  message: Partial<MessageInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!message.conversationId) errors.push('Conversation ID is required');
  if (!message.senderId) errors.push('Sender ID is required');
  if (!message.content) errors.push('Message content is required');
  if (message.type && !Object.keys(MESSAGE.TYPES).includes(message.type)) {
    errors.push('Invalid message type');
  }
  if (message.status && !Object.keys(MESSAGE.STATUS).includes(message.status)) {
    errors.push('Invalid message status');
  }
  return { isValid: errors.length === 0, errors };
};
