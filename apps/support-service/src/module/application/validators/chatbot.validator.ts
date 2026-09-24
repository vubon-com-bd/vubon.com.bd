import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotValidator {
  validate(input: unknown): unknown {
    if (!input || typeof input !== 'object') {
      throw new Error('Chatbot input must be an object');
    }
    const data = input as Record<string, unknown>;
    if (typeof data.message !== 'string' || data.message.trim().length === 0) {
      throw new Error('Chatbot message is required');
    }
    return input;
  }
}
