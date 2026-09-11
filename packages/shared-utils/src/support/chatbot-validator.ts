import { CHATBOT } from '@vubon/shared-constants/src/support/chatbot.constants';

export interface ChatbotInput {
  name: string;
  status: string;
  type: string;
  confidenceThreshold: number;
}

export const validateChatbot = (
  chatbot: Partial<ChatbotInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!chatbot.name) errors.push('Chatbot name is required');
  if (chatbot.status && !Object.keys(CHATBOT.STATUS).includes(chatbot.status)) {
    errors.push('Invalid chatbot status');
  }
  if (chatbot.type && !Object.keys(CHATBOT.CHATBOT_TYPES).includes(chatbot.type)) {
    errors.push('Invalid chatbot type');
  }
  if (
    chatbot.confidenceThreshold !== undefined &&
    (chatbot.confidenceThreshold < 0 || chatbot.confidenceThreshold > 1)
  ) {
    errors.push('Confidence threshold must be between 0 and 1');
  }
  return { isValid: errors.length === 0, errors };
};
