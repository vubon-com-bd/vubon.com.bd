import { LIVE_CHAT } from '@vubon/shared-constants/src/support/live-chat.constants';

export interface LiveChatInput {
  userId: string;
  status: string;
  type: string;
}

export const validateLiveChat = (
  chat: Partial<LiveChatInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!chat.userId) errors.push('User ID is required');
  if (chat.status && !Object.keys(LIVE_CHAT.STATUS).includes(chat.status)) {
    errors.push('Invalid chat status');
  }
  if (chat.type && !Object.keys(LIVE_CHAT.CHAT_TYPES).includes(chat.type)) {
    errors.push('Invalid chat type');
  }
  return { isValid: errors.length === 0, errors };
};
