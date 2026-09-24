import { Injectable } from '@nestjs/common';

export interface ChatbotMessageInput {
  readonly chatbotId: string;
  readonly userId: string;
  readonly message: string;
}

@Injectable()
export class ChatbotValidator {
  validate(input: ChatbotMessageInput): void {
    if (!input.chatbotId) {
      throw new Error('Chatbot ID is required');
    }
    if (!input.message || input.message.trim().length === 0) {
      throw new Error('Message is required');
    }
    if (input.message.length > 5000) {
      throw new Error('Message must not exceed 5000 characters');
    }
  }
}
