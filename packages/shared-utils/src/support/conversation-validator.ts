import { CONVERSATION } from '@vubon/shared-constants/src/support/conversation.constants';

export interface ConversationInput {
  ticketId: string;
  status: string;
  type: string;
}

export const validateConversation = (
  conversation: Partial<ConversationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!conversation.ticketId) errors.push('Ticket ID is required');
  if (conversation.status && !Object.keys(CONVERSATION.STATUS).includes(conversation.status)) {
    errors.push('Invalid conversation status');
  }
  if (
    conversation.type &&
    !Object.keys(CONVERSATION.CONVERSATION_TYPES).includes(conversation.type)
  ) {
    errors.push('Invalid conversation type');
  }
  return { isValid: errors.length === 0, errors };
};
